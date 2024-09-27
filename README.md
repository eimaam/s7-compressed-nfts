# Compressed NFTs - cNFTs

## Overview

This is the 9th submission under the Solana Summer Fellowship - this assignment involves creating a system to mint **Compressed NFTs (cNFTs)** with your Info and Social Links as `metadata` and airdrop them to other Fellows. The project will upload metadata, create a collection, mint a cNFT, and then distribute (airdrop) the cNFT to multiple recipients from a pre-defined list of student wallet addresses.

## Project Structure

### 1. **metadata.json**

This file contains the metadata for the cNFT, including:

- Name
- Description
- Image URL
- External URL
- Social Links etc

### 2. **fellow-wallets.json**

This file contains the list of wallet addresses that will receive the airdropped cNFT. Each address is a recipient's Solana wallet.

## Requirements

1. **Node.js**: This project is built with JavaScript using Node.js.
2. **Solana CLI Tools**: Ensure you have the necessary tools to interact with the Solana blockchain.
3. **Metaplex**: You'll need the Metaplex SDK to mint and manage NFTs on Solana.

### Dependencies

Install the required dependencies:

```bash
npm install @metaplex-foundation/mpl-bubblegum @metaplex-foundation/umi @solana/web3.js
```

## Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/eimaam/s8-compressed-nfts
cd s8-compressed-nfts
```

### 2. Add Metadata

Modify the `metadata.json` file to contain your NFT's metadata. Example:

```json
{
  "name": "Fellowship cNFT",
  "description": "This cNFT is awarded to students for completing the 9th assignment.",
  "image": "https://your-image-url.com",
  "external_url": "https://fellowship.example.com"
}
```

### 3. Add Wallet Addresses (Optional)

Populate the `fellows.wallets.json` file with the wallet addresses of students who will receive the cNFT airdrop:

```json

```

### 4. Run the Script

```bash
node mintCNFT.ts
```

### 5. Output

Once the script runs successfully, it will:

- Upload the metadata.
- Mint the cNFT.
- Airdrop the cNFT to all wallet addresses in `wallets.json`.

### 6. Error Handling

The script includes error handling to notify you if any issues occur during the airdrop process for specific wallets
