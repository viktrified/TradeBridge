# Trade Bridge
![Trade Bridge](frontend/public/preview.png)

## Description

&nbsp;&nbsp;&nbsp;&nbsp; **Trade Bridge** is a decentralized commodity marketplace platform that allows buyers and sellers to trade commodities in a trustless environment using blockchain technology. The platform incorporates tokenization, decentralized and NFT minting/burning to represent commodity ownership. It also handles disputes between parties and includes a fee system to sustain platform operations

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Deployment](#deployment)
4. [Features](#features)
5. [Future Features / Roadmap](#future-features-roadmap)
6. [Technologies](#technologies)
7. [Deployed Contract Address](#deployed-contract-address)
8. [Pitch Deck](#pitch-deck)
9. [YouTube Link](#youtube-link)


## Installation
 clone the repository
```
git clone https://github.com/viktrified/TradeBridge.git
```

 ## Navigate to the project directory:
    ```bash
    cd TradeBridge
    ```

 ## Install dependencies:
    ```bash
     npm install
    ```

## Usage

### Compile Contracts:
```bash
npx hardhat compile
```
### Running Test
```bash
npx hardhat test
```

### Deploy the project
```bash
npx hardhat run /scripts/deploy.ts --network lisk-sepolia
```
## Problems we are solving
&nbsp;&nbsp;&nbsp;&nbsp; In the current e-commerce and digital marketplace landscape, there are several key challenges:

 - **Lack of trust between buyers and sellers**: Traditional online marketplaces often lack transparency, and buyers and sellers need to rely on third-party intermediaries to facilitate transactions. This can lead to mistrust, especially in the case of disputes.

- **Centralized control**: Most existing platforms are centralized, giving the platform operators significant control over transaction rules, fees, and the resolution of disputes, which can lead to unfair practices or biased outcomes.

- **Ownership and authenticity** : Once a transaction is completed, proving ownership of a product can be difficult. Buyers may not have a reliable way to confirm or showcase that they truly own a product after purchasing it, leading to issues around authenticity and counterfeit items.

- **Inefficient dispute resolution** : In traditional systems, resolving disputes can be slow, cumbersome, and sometimes unfair, often with the platform making the final decision without full transparency.


Here’s a revised version outlining the solutions your project provides to address the key challenges in the e-commerce and digital marketplace landscape:

## Solutions
- Building Trust between Buyers and Sellers:

By utilizing blockchain technology, our platform creates a transparent and secure environment for transactions. Every transaction is recorded on the blockchain, ensuring that both buyers and sellers have access to an immutable transaction history, fostering trust and accountability.
## Decentralization:

&nbsp;&nbsp;&nbsp;&nbsp; Our marketplace operates on a decentralized model, eliminating the need for central authorities. This means that users retain control over their transactions and data, reducing the risk of unfair practices or biased outcomes. Sellers set their own rules, fees, and terms of service.
Proof of Ownership and Authenticity:


&nbsp;&nbsp;&nbsp;&nbsp; This project aims to address these issues by utilizing decentralized finance (DeFi) and blockchain technology to create a trustless marketplace. It provides transparency, security, and decentralized dispute resolution, all while ensuring buyers receive proof of ownership in the form of NFTs for their purchases.

## Present Features


### Seller
- Sellers can list new commodities available for trade by setting the value   for the commodity, the commodities are tokenized into a digital asset represented as an NFT to ensure traceability and ownership on the blockchain. sellers can also raise or respond to disputes. .

 
### Buyers 
- The buyer can buy any commodity using the **LSK** token.
- On Successfull payment, an NFT will be issued to the Buyer to signify the own the commodity.

### System(Smart contract)
- Resolve Dispute: When a dispute is raised, funds will be temporarily hold in the contract  until the the dispute is resolved and once the dispute is resolved the transaction can proceed and the commodity is transferred to the buyer or the seller account.
- The smart contract provide the plateform for the buyers and sellers to trade.
- The smart contract gives rating upon eacch successfull  to the seller.

## Future  Features
- Verifying users Identity using optimistic rollups to.

## Technologies & Platforms Used
The following technologies were used to build this project:

- **Solidity**: Smart contract language for Ethereum development.
- **Hardhat**: Ethereum development environment for compiling, testing, and deploying smart contracts.
- **JavaScript**: Used for writing deployment and test scripts.
- **Ethers.js**: JavaScript library for interacting with the Ethereum blockchain.
- **Node.js**: Runtime environment for running JavaScript code on the server.
- **Mocha/Chai**: Testing framework for writing unit tests for smart contracts.
- **Git**: Version control system to track changes and collaborate on the project.
- **Openzepplin**: Used the ERC1155 library
- **Alchemy**: Alchemy is a blockchain development platform that provides tools and infrastructure for building and scaling decentralized applications (dApps).

 ## Deloyed Smart Contract Address

 ```bash
 0xCF0afE977a7e2BF0ac43da91321eCdc4b6199f21
 ```
 https://sepolia.basescan.org/address/0x0925bd29906877bc143EB1FcE74D0F58d05fb0B4


 ## Pitch Deck Link
 https://docs.google.com/presentation/d/1T4nuWUx1GStMJKIeAVNcZq0e6JdieVRAZLtg-33_zBY/edit?usp=sharing

 ## YouTube Demo Link
 https://youtu.be/pB3wG40rMPI?feature=shared