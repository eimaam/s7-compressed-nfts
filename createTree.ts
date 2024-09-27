import { createTree } from "@metaplex-foundation/mpl-bubblegum";
import { umi } from "./umi";
import { generateSigner } from "@metaplex-foundation/umi";

export async function createMerkleTree() {
  const merkleTreeSigner = generateSigner(umi);

  const builder = await createTree(umi, {
    merkleTree: merkleTreeSigner,
    maxDepth: 14, // Supports up to 16,384 NFTs
    maxBufferSize: 64,
    canopyDepth: 0,
  });

  await builder.sendAndConfirm(umi);
  console.log("Merkle Tree created at ==>", merkleTreeSigner.publicKey.toString());
  return merkleTreeSigner.publicKey;
}

createMerkleTree();
