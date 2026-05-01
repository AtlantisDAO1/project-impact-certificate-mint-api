# NFT Minting System Architecture

## Overview

This document outlines the architecture for the HTTP-based NFT Minting System. The system allows users to mint NFTs by first making a crypto payment and subsequently sending an HTTP request containing the transaction hash and necessary metadata. The infrastructure is decoupled using a combination of a traditional Express.js backend on an EC2 instance, AWS Serverless Lambda functions, and a MongoDB database to handle minting asynchronously and robustly.

---

## System Components

### 1. Backend Service (`project-ic-minter`)
- **Type:** Node.js / Express.js REST API
- **Deployment:** AWS EC2 instance named `Testing`
- **Role:** Acts as the primary entry point for user requests. It exposes endpoints for initiating mint requests and inquiring about the mint status. 
- **Responsibilities:**
  - Receives the minting HTTP requests from users.
  - Validates the incoming parameters (e.g., transaction hash, metadata).
  - Forwards valid requests to the `mintRequestReceiver` AWS Lambda via API calls.
  - Exposes status-check endpoints so users can poll the current state of their minting request.

### 2. Mint Request Receiver (`mintRequestReceiver`)
- **Type:** AWS Lambda Function
- **Role:** Intermediate queuing and database writing layer.
- **Responsibilities:**
  - Receives forwarding requests from the `project-ic-minter` backend.
  - Processes and formats the mint request data.
  - Inserts the mint request record into the MongoDB database with an initial status (e.g., "Pending").

### 3. Database
- **Type:** MongoDB
- **Role:** Central state management and queueing database.
- **Responsibilities:**
  - Stores all mint requests, user metadata, and transaction hashes.
  - Tracks the status of each minting job (e.g., Pending, Success, Failed).
  - Acts as the source of truth for user status queries.

### 4. Minter Service (`minter`)
- **Type:** AWS Lambda Function
- **Role:** Asynchronous NFT Minting Worker.
- **Responsibilities:**
  - Periodically invoked (e.g., via AWS EventBridge/Cron) to fetch pending mint requests from the MongoDB database.
  - Interfaces with the blockchain network (EVM) to execute the actual `mintERC721` transaction using the designated smart contract.
  - Updates the MongoDB database record with the resulting mint transaction hash and sets the status to "Completed" or "Failed" based on the blockchain transaction outcome.

### 5. Smart Contracts (`Impact-certificate-evm`)
- **Type:** Solidity Smart Contracts & Hardhat Deployment Scripts
- **Role:** The on-chain logic and NFT definition.
- **Responsibilities:**
  - Defines the ERC-721 Impact Certificate NFT.
  - Handles the on-chain minting logic, ownership mapping, and metadata URI storage.
  - Deployed to the target EVM-compatible blockchain using Hardhat.

---

## Minting Workflow

![Minting Workflow Sequence Diagram](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgcGFydGljaXBhbnQgVXNlclxuICAgIHBhcnRpY2lwYW50IEVDMl9CYWNrZW5kXG4gICAgcGFydGljaXBhbnQgUmVjZWl2ZXJfTGFtYmRhXG4gICAgcGFydGljaXBhbnQgTW9uZ29EQlxuICAgIHBhcnRpY2lwYW50IE1pbnRlcl9MYW1iZGFcbiAgICBwYXJ0aWNpcGFudCBCbG9ja2NoYWluXG5cbiAgICBVc2VyLT4+QmxvY2tjaGFpbjogMS4gTWFrZSBjcnlwdG8gcGF5bWVudFxuICAgIFVzZXItPj5FQzJfQmFja2VuZDogMi4gSFRUUCBQT1NUIE1pbnQgUmVxdWVzdFxuICAgIEVDMl9CYWNrZW5kLT4+UmVjZWl2ZXJfTGFtYmRhOiAzLiBGb3J3YXJkIFZhbGlkYXRlZCBSZXF1ZXN0XG4gICAgUmVjZWl2ZXJfTGFtYmRhLT4+TW9uZ29EQjogNC4gQWRkIFJlcXVlc3QgdG8gREJcbiAgICBSZWNlaXZlcl9MYW1iZGEtLT4+RUMyX0JhY2tlbmQ6IDUuIFJldHVybiBzdWNjZXNzXG4gICAgRUMyX0JhY2tlbmQtLT4+VXNlcjogNi4gUmV0dXJuIFJlcXVlc3QgSURcbiAgICBcbiAgICBsb29wIFBvbGxpbmdcbiAgICAgICAgTWludGVyX0xhbWJkYS0+Pk1vbmdvREI6IDcuIEZldGNoIFBlbmRpbmcgTWludCBSZXF1ZXN0c1xuICAgIGVuZFxuXG4gICAgTWludGVyX0xhbWJkYS0+PkJsb2NrY2hhaW46IDguIEV4ZWN1dGUgbWludEVSQzcyMSgpXG4gICAgQmxvY2tjaGFpbi0tPj5NaW50ZXJfTGFtYmRhOiA5LiBSZXR1cm4gTWludCBUeCBIYXNoXG4gICAgTWludGVyX0xhbWJkYS0+Pk1vbmdvREI6IDEwLiBVcGRhdGUgREJcblxuICAgIFVzZXItPj5FQzJfQmFja2VuZDogMTEuIFBvbGwgTWludCBTdGF0dXNcbiAgICBFQzJfQmFja2VuZC0+PlJlY2VpdmVyX0xhbWJkYTogMTIuIEZldGNoIFN0YXR1c1xuICAgIFJlY2VpdmVyX0xhbWJkYS0+Pk1vbmdvREI6IDEzLiBRdWVyeSBEQlxuICAgIE1vbmdvREItLT4+UmVjZWl2ZXJfTGFtYmRhOiAxNC4gUmV0dXJuIFN0YXR1c1xuICAgIFJlY2VpdmVyX0xhbWJkYS0tPj5FQzJfQmFja2VuZDogMTUuIFJldHVybiBTdGF0dXNcbiAgICBFQzJfQmFja2VuZC0tPj5Vc2VyOiAxNi4gUmV0dXJuIE1pbnQgU3VjY2VzcyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)

## Technical Stack
- **Languages:** Node.js (JavaScript), Solidity
- **Backend Framework:** Express.js
- **Cloud Infrastructure:** AWS EC2, AWS Lambda
- **Database:** MongoDB
- **Blockchain Tooling:** Hardhat, Ethers.js / Web3.js
- **Smart Contract Standard:** ERC-721 (EVM)
