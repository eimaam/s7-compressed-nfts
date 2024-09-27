import { mintToCollectionV1 } from "@metaplex-foundation/mpl-bubblegum";
import { umi } from "./umi";
import {
  generateSigner,
  percentAmount,
  publicKey,
} from "@metaplex-foundation/umi";
import fs from "fs";
import { createNft } from "@metaplex-foundation/mpl-token-metadata";
import { createMerkleTree } from "./createTree";

const metadataFile = fs.readFileSync("metadata.json", "utf-8");

const metadata = JSON.parse(metadataFile);

const leafOwner = publicKey("8hBosSCfzLy2fyoDU6UxfyALdj3vpPcW62s47Mth2ZSP"); // The owner of the cNFT
const merkleTree = createMerkleTree();
const merkleTreePublicKey = publicKey(merkleTree.toString());

const collectionId = generateSigner(umi);

async function mintCNFT() {
  const data = {
    name: "eimaam",
    image: metadata.uri,
    description: metadata.description,
    external_url: "https://eimaam.dev",
  };

  console.log("Uploading metadata...");
  const collectionMetadataUri = await umi.uploader.uploadJson(data);

  console.log("Metadata uploaded at:", collectionMetadataUri);

  console.log("Creating NFT collection...");
  await createNft(umi, {
    mint: collectionId,
    name: metadata?.name,
    uri: collectionMetadataUri,
    sellerFeeBasisPoints: percentAmount(5.5), // 5.5% royalty
    isCollection: true,
  }).sendAndConfirm(umi);

  console.log("NFT collection created at:", collectionId.publicKey.toString());

  console.log("Minting cNFT...");

  const { signature } = await mintToCollectionV1(umi, {
    leafOwner,
    merkleTree: merkleTreePublicKey,
    collectionMint: collectionId.publicKey,
    metadata: {
      ...metadata,
      collection: {
        key: collectionId.publicKey,
        verified: false,
      },
      creators: [
        {
          address: umi.identity.publicKey,
          verified: true,
          share: 100,
        },
      ],
    },
  }).sendAndConfirm(umi, {
    send: {
      commitment: "finalized",
    },
  });

  console.log(`Minted cNFT with transaction: ${signature}`);
}

mintCNFT();
