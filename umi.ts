import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplBubblegum } from '@metaplex-foundation/mpl-bubblegum'
import { Keypair } from '@solana/web3.js'
import { generateSigner, keypairIdentity, KeypairSigner } from '@metaplex-foundation/umi'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { getKeypair, getSecretKey } from './utils'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'

// Connect to Solana devnet (a test environment)
export const umi = createUmi('https://api.devnet.solana.com')
.use(mplBubblegum())
.use(mplTokenMetadata())
.use(irysUploader()) // Use the Irys uploader for metadata uploads

// Generate a new wallet to use with UMI
const signer = getSecretKey()

// convert keypair to metaplex supported signer
const keypair = umi.eddsa.createKeypairFromSecretKey(signer)

umi.use(keypairIdentity(keypair))

