
# Impact Certificates API Documentation

## Table of Contents

- [Overview](#1-overview--impact-certificate-minter)
- [Prerequisite: Payment Requirement](#2-prerequisite-payment-requirement)
- [API Endpoints](#3-api-endpoints)
  - [1. Mint Impact Certificate API](#1-mint-impact-certificate-api)
    - [Request Body](#request-body)
    - [Field Descriptions](#field-descriptions)
    - [Success Responses](#success-responses)
    - [Failure Responses](#failure-responses)
  - [2. Check Certificate Status API](#2-check-impact-certificate-mint-status-api)
    - [Success Responses](#success-responses-1)
    - [Status Values](#possible-mint-request-statuses)
    - [Failure Responses](#failure-responses-1)
- [Reference Tables](#4-reference-tables)
  - [1. Supported Payment Tokens](#1-supported-payment-tokens)
  - [2. Supported Minting Chains](#2-supported-blockchains-for-mintingpayment)
- [How to Deploy Your Own Instance](#5-how-to-deploy-your-own-instance)
- [Appendix](#6-appendix)
  - [Impact Cores](#impact-cores)
  - [Supported Bounty Types](#supported-bounty-types)
  - [Sustainable Development Goals (SDGs)](#sustainable-development-goals-sdgs)
- [License](#7-license)
---

## 1. Overview – Impact Certificate Minter

### **What We Have Built**

The **Impact Certificate Minter (ICM)** is an open-source, on-chain protocol that enables projects to **mint verifiable proof-of-impact certificates** after completing measurable sustainability or social actions. The system is live and deployed across **multiple Layer-2 networks** (Base, Optimism, Arbitrum, and Celo).

Each certificate is minted as a **non-fungible token (NFT)** using a structured metadata format defined in our API schema.

The `/mintRequest` endpoint accepts a JSON payload containing key fields such as:

- `projectId`, `certificateName`, and `description`
- `impactCores` (e.g., Water, Energy, Social, Earth)
- `sdg_primary` and `sdg_secondary` codes following UN SDG numbering
- `fundsDeployed`, `bountyPassCount`, and `bountyFailCount` metrics
- `validatorAddress` and `attestationComments` for validation data
- `paymentToken` and `transactionHash` verifying fee completion

Once a valid request is submitted, the `/mintStatus` endpoint returns real-time updates with statuses such as `REQUESTED`, `PROCESSING`, and `MINTED`.

Reference tables define all supported payment tokens, chains, and SDG identifiers. Certificates are permanently stored on-chain, auditable, and interoperable with any project or DAO that requires verifiable impact tracking.

---

### **Why This Matters**

Most impact claims today exist as PDF reports or internal dashboards that are unverifiable, inconsistent, and disconnected from public accountability.

ICM introduces a **common data standard for proof of impact**, ensuring that verified outcomes (e.g., “500 trees planted under SDG 15” or “200 households provided clean water under SDG 6”) are recorded immutably on-chain and accessible through open APIs.

This transforms fragmented sustainability reporting into a **transparent, programmable impact layer**. Funders, DAOs, and governments can instantly verify that actions occurred, while developers can build coordination, analytics, or incentive mechanisms that rely on validated, machine-readable outcomes.

---

### **Current Limitations and Acknowledged Challenges**

As an early-stage open-source protocol, we recognize that **data authenticity and validation layers are still evolving**.

Because any project can currently submit a mint request, **false or incomplete data could theoretically be entered**, producing certificates that lack sufficient validation. Other known limitations include:

- **Validator trust** — current attestations depend on project-selected validators, not yet on decentralized reputation or staking.
- **Proof verification** — geotagged or timestamped evidence isn’t yet cross-validated via external oracles.
- **Data anomalies** — the system lacks AI-driven pattern recognition to detect irregular or duplicate submissions.
- **Governance maturity** — schema and validator oversight are community-managed but not yet DAO-governed.

We are **fully aware of these early-stage challenges** and are designing the next phases of ICM to directly address them through stronger AI-assisted validation, decentralized governance, and continuous community audits.

---

### **How It Serves the Ecosystem**

ICM acts as **open infrastructure for verifiable impact**, enabling the broader regenerative ecosystem to adopt a shared proof format:

- **ReFi and climate projects** can mint verified certificates for milestones achieved.
- **DAOs and treasuries** can link funding tranches to validated on-chain proofs.
- **Auditors and researchers** can query the open dataset for SDG-aligned progress.
- **Developers** can use SDKs to create dashboards, analytics, and visualization tools.

The schema-driven and chain-agnostic design allows adoption by both small NGOs and large institutions, bridging the data gap between grassroots projects and global ESG standards.

---

### **Future Roadmap (Nov 2025 – Dec 2026)**

### **Phase 1 – Expansion & SDG Engine (Nov 2025 – Jan 2026)**

- Extend schema to include **SDG sub-targets and impact intensity indicators**.
- Release templates to help projects map outcomes to UN targets.
- Onboard 20+ verified projects across water, biodiversity, waste, and education categories.

### **Phase 2 – Verification, AI Integration & Developer Tools (Feb – Apr 2026)**

- Deploy a **Proof-of-Workflow validation layer** combining validator attestations, geotagged media, and oracle checks.
- Introduce **AI-assisted data verification** to flag inconsistencies, detect duplicate evidence, and assess media authenticity (e.g., timestamp mismatch, image reuse, location spoofing).
- Train AI models on verified datasets to improve accuracy in identifying legitimate submissions.
- Publish **JavaScript, TypeScript, and Python SDKs**, and launch a **no-code dashboard** for non-technical users.

### **Phase 3 – Cross-Chain Registry, AI Reasoning & Governance (May – Aug 2026)**

- Create a **public registry and explorer** to browse and verify certificates by SDG, project, or geography.
- Integrate **Karma GAP** for automated milestone scoring and validator reputation tracking.
- Add **AI reasoning agents** that analyze certificate metadata to suggest SDG correlations or highlight anomalies.
- Formalize a **community governance group** to manage schema updates, validator onboarding, and appeals.

### **Phase 4 – Open Data, Ecosystem Growth & AI Model Publishing (Sept – Dec 2026)**

- Publish an **open dataset of 10,000+ certificates** with AI-assisted metadata validation.
- Develop SDG dashboards with aggregated insights across impact cores and geographies.
- Open-source trained **AI validation models** and provide APIs for third-party platforms to use them.
- Launch developer bounties to expand validator networks, AI modules, and analytics features.

---

### **Expected Outcomes by March 2026**

- Fully deployed across Ethereum and at least two L2 networks including Celo.
- **100+ verified projects** issuing impact certificates.
- AI-enabled detection of invalid or inconsistent data submissions.
- Integration with **Karma GAP** for automated progress scoring.
- SDKs, dashboards, and validator reputation systems publicly available.
- Verified open dataset powering research and impact reporting.

---

### **Sustainability and Governance**

ICM is governed as a **public good**, licensed under MIT.

A transparent contributor council will oversee validator onboarding, schema versioning, and AI model transparency.

Sustainability will be maintained through:

- Minimal minting fees (in stablecoins) to support infrastructure.
- DAO partnerships and ecosystem integrations.
- Community-driven governance proposals.
- Open publication of AI models and validation datasets to maintain accountability.

Our long-term vision combines **AI intelligence** and **on-chain transparency** to build a trust fabric for regenerative systems — where every action can be verified, contextualized, and recognized.

---

### **In Summary**

The **Impact Certificate Minter** converts real-world sustainability outcomes into structured, verifiable, and AI-auditable on-chain proofs.

It is still in its early stages, but already functioning as a backbone for measurable impact, verifiable transparency, and collaborative data validation.

With Ethereum for the World’s support, ICM will evolve from a functioning open protocol into a **global verification layer** where blockchain ensures immutability and AI ensures integrity - creating a unified, trusted system for proving the world’s progress toward the Sustainable Development Goals.

---

## 2. Prerequisite: Payment Requirement

Users have the option to mint impact certificates on the following blockchains: 
| Chain Name   | Chain ID |
| -------------| ---------|
| arbitrum     | 42161    |
| base         | 8453     |
| celo         | 42220    |
| optimism     | 10       |

Before requesting the minting of an Impact Certificate, the project initiator must make a payment of **1 USD worth** in a supported token.
[See the list of available tokens for payment here](#1-supported-payment-tokens)

- This payment needs to be sent to address **"0x3598c4D8fA65cb920BcCa1EC1e5a294aa7e9817D"**.
- This payment ensures authenticity and prevents spam minting requests.
- The payment details (transaction hash, token address, chain) must be included in the `mintRequest` API call.

The blockchain used for making payment and blockchain to be used for minting can be different.

---

## 3. API Endpoints

### 1. Mint Impact Certificate API

**Endpoint**

```
POST https://4vnprobuo7.execute-api.ap-south-1.amazonaws.com/production/v1/mintRequest
```

**Description**\
This API endpoint is used for sending request to mint an **Impact Certificate (IC)** for a completed project. Users recieve a request id for all the successful requests made that can be used to fetch the mint status of the impact certificate.


#### Request Body

```json
{
  "projectName": "Sample Project",
  "projectStartDate": "2025-09-18T13:40:40",
  "projectEndDate": "2025-09-25T13:40:40",
  "backerName": "Sample Organisation",
  "backerLogo": "https://orgwebsite.org/sample_image.png",
  "projectDescription": "This project was carried out in Bengaluru to promote rainwater harvesting. Over 20000 households setup rainwater harvesting which can    potentially lead to 4000000 litres of water being harvested",
  "totalFundsDeployedUSD": 50000,
  "totalImpactPointsAllocated": 2000000,
  "impactCoresAffected": ["Water", "Earth", "Energy", "Social"],
  "SDGsAffected": ["Zero hunger", "No poverty"],
  "bountyTypeWisePassAndFailCount": [
    {
      "type": "Design",
      "passCount": 20,
      "failCount": 5
    },
    {
      "type": "Code",
      "passCount": 23,
      "failCount": 2
    }
  ],
  "paymentTransactionBlockchain": "arbitrum",
  "paymentTransactionHash": "0x9f3a1c7b4e2d90f5b8c3a6e12d7f4b0c5a9e8f1d2c3b4a5e6f7091a2b3c4d5e",
  "paymentTokenAddress": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  "mintBlockchain": "arbitrum",
  "receiverAddress": "0x7c4e9a3f82b5d1a6c2f08b34e9d7ab1938f5e247"
}
```

#### Field Descriptions

| Field                            | Type          | Description                                                               |
| -------------------------------- | ------------- | ------------------------------------------------------------------------- |
| `projectName`                    | string        | Name of the project carried out.                                          |
| `projectStartDate`               | datetime      | Start date of project execution in ISO format.                            |
| `projectEndDate`                 | datetime      | End date of the project in ISO format.                                    |
| `backerName`                     | string        | Name of the organization that initiated the project.                      |
| `backerLogo`                     | string        | URL corresponding to logo of the organization that initiated the project. |
| `projectDescription`             | string        | Summary of the work done under the project.                               |
| `totalFundsDeployedUSD`          | number        | Total funds utilized for the project in USD.                              |
| `totalImpactPointsAllocated`     | number        | Total points allocated to contributors of this project.                   |
| `impactCoresAffected`            | array[string] | List of impact cores affected by the project. Options:`[Water, Earth, Energy, Social]`.|
| `SDGsAffected`                   | array[string] | Sustainable development goals achieved by the project. [See full list of Sustainable Development Goals (SDGs)](#sustainable-development-goals-sdgs).            |
| `bountyTypeWisePassAndFailCount` | array[object] | Distribution of valid and invalid bounty submission counts by bounty type. [See full list of supported bounty types](#supported-bounty-types)                                     |
| `paymentTransactionBlockchain`   | string        | Blockchain used for payment. [See full list of supported blockchains](#2-supported-blockchains-for-mintingpayment)                                            |
| `paymentTransactionHash`         | string        | Transaction hash corresponding to the mint fee payment.                                              |
| `paymentTokenAddress`            | string        | Address of the token used for the payment.                                           |
| `mintBlockchain`                 | string        | Blockchain on which the impact certificate is to be minted.                   |
| `receiverAddress`                | string        | Address that will receive the minted impact certificate.                                  |


#### Success Responses

```json
200
{
  "requestId": "kR5vhGpUU6PTEy5033ffadYfZY7ka6Rq"
}
```

####  Failure Responses

```json
400
{
  "message": "Payment transaction is already used for minting"
}
```
```json
400
{
  "message": "Transaction receipt not found"
}
```
```json
400
{
  "message": "Mint fee not sent to the expected address"
}
```
```json
400
{
  "message": "Insufficient fee paid for minting"
}
```
```json
400
{
  "message": "Transaction hash does not correspond to mint reqeuest fee payment"
}
```
```json
400
{
  "message": "Invalid token specified for payment"
}
```

### 2. Check Impact Certificate Mint Status API

**Endpoint**

```
GET https://4vnprobuo7.execute-api.ap-south-1.amazonaws.com/production/v1/mintStatus?requestId=<request_id>
```

**Description**\
Fetches the mint status corresponding to the passed mint request ID.


#### Success Responses

```json
200
{
  "status": "MINTED",
  "transactionHash": "0x9f3a1c7b4e2d90f5b8c3a6e12d7f4b0c5a9e8f1d2c3b4a5e6f7091a2b3c4d5e"
}
```
```json
200
{
  "status": "REQUESTED"
}
```

#### Failure Responses

```json
404
{
  "message": "No request found with the specified ID"
}
```

#### Possible Mint Request Statuses

- `REQUESTED` → Request has been received.
- `MINTED` → Impact certificate successfully minted.

---

## 4. Reference Tables

### 1. Supported Payment Tokens

| Token   | Token Address                                | Chain    | Chain ID | Amount      |
| --------| ---------------------------------------------| -------- | -------- | ------------|
| USDC    | `0xaf88d065e77c8cC2239327C5EDb3A432268e5831` | arbitrum | 42161    | 1           |
| USDT    | `0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9` | arbitrum | 42161    | 1           |
| DAI     | `0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1` | arbitrum | 42161    | 1           |
| USDGLO  | `0x4F604735c1cF31399C6E711D5962b2B3E0225AD3` | arbitrum | 42161    | 1           |
| USDC    | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | base     | 8453     | 1           |
| DAI     | `0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb` | base     | 8453     | 1           |
| USDT    | `0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2` | base     | 8453     | 1           |
| USDGLO  | `0x4F604735c1cF31399C6E711D5962b2B3E0225AD3` | base     | 8453     | 1           |
| USDC    | `0xcebA9300f2b948710d2653dD7B07f33A8B32118C` | celo     | 42220    | 1           |
| USDT    | `0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e` | celo     | 42220    | 1           |
| DAI     | `0xE4fE50cdD716522A56204352f00AA110F731932d` | celo     | 42220    | 1           |
| cUSD    | `0x765DE816845861e75A25fCA122bb6898B8B1282a` | celo     | 42220    | 1           |
| USDGLO  | `0x4F604735c1cF31399C6E711D5962b2B3E0225AD3` | celo     | 42220    | 1           |
| USDC    | `0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85` | optimism | 10       | 1           |
| DAI     | `0xda10009cbd5d07dd0cecc66161fc93d7c9000da1` | optimism | 10       | 1           |
| USDT    | `0x94b008aA00579c1307B0EF2c499aD98a8ce58e58` | optimism | 10       | 1           |
| USDGLO  | `0x4F604735c1cF31399C6E711D5962b2B3E0225AD3` | optimism | 10       | 1           |


### 2. Supported Blockchains For Minting/Payment

| Chain Name   | Chain ID |
| -------------| ---------|
| arbitrum     | 42161    |
| base         | 8453     |
| celo         | 42220    |
| optimism     | 10       |

---

## 5. How to Deploy Your Own Instance

### **Overview**

This guide provides step-by-step instructions for **deploying your own instance** of the **Impact Certificate Minting Service**.

The system comprises **four key components**:

1. **impact-certificate-evm** – NFT smart contract
2. **mint-request-receiver** – AWS Lambda function to receive mint requests
3. **minter-service** – AWS Lambda function to execute minting
4. **project-ic-minter** – Express.js API wrapper


### **Prerequisites**

### Required Tools

- Node.js (v18+ recommended)
- npm or yarn
- AWS CLI configured with credentials
- MongoDB Atlas account (or self-hosted MongoDB)
- Ethereum wallet (private key required)
- RPC provider access (Infura, Alchemy, QuickNode etc.)

### Required Accounts

- AWS Account (for Lambda deployment)
- MongoDB Atlas Account
- Blockchain RPC Provider Account (Infura/Alchemy/QuickNode etc.)
- Sufficient ETH/tokens for gas fees on target chains

### Supported Chains

| Chain | Chain ID |
| --- | --- |
| Arbitrum | 42161 |
| Base | 8453 |
| Celo | 42220 |
| Optimism | 10 |


### **Part 1: Deploy Smart Contract**

#### 1.1 Setup Smart Contract Project

```bash
cd impact-certificate-evm
npm install
```

#### 1.2 Configure Environment

Create a `.env` file:

```bash
# Network RPC URLs
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
CELO_RPC_URL=https://forno.celo.org
OPTIMISM_RPC_URL=https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY

# Deployer private key (without 0x prefix)
PRIVATE_KEY=your_private_key_here


```

#### 1.3 Compile and Deploy

```bash
npx hardhat compile
npx hardhat run scripts/projectImpactCertificateDeploy.js --network arbitrum
```

Repeat for each chain you want to deploy on.

#### 1.4 Authorize Wallet for Minting

The deployed smart contract has a function with the signature `function authorize(address toAuthorize) public` . This function can only be called by the address that deployed the smart contract. After deployment, you need to write and execute a script that will call this function passing in the EVM address that you want to perform the minting. Make sure that the authorized address holds enough funds for gas fees.


### **Part 2: Setup MongoDB Database**

#### 2.1 Create MongoDB Atlas Cluster

- Create a cluster and a database inside it named **impact-certificates**
- Collections: `mintrequests` , `blockchains`
- Populate the `blockchains` collection with documents, where each document will contain the details of a blockchain, list of tokens that can be used for paying mint fee on that blockchain, and the address to which the mint fee has to be paid. Example document:

```jsx
{
  "chainName": "base",
  "chainId": 8453,
  "mintFeeReceiverAddress": "0x3598c4D8fA65cb920BcCa1EC1e5a294aa7e9817D",
  "paymentTokens": [
    {
      "tokenName": "USDC",
      "tokenAddress": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      "mintFee": 1,
      "decimals": 6
    },
    {
      "tokenName": "DAI",
      "tokenAddres": "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      "mintFee": 1,
      "decimals": 18
    },
    {
      "tokenName": "USDT",
      "tokenAddress": "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
      "mintFee": 1,
      "decimals": 6
    },
    {
      "tokenName": "USDGLO",
      "tokenAddress": "0x4F604735c1cF31399C6E711D5962b2B3E0225AD3",
      "mintFee": 1,
      "decimals": 18
    }
  ]
}
```

- Get the connection string:

```
mongodb+srv://username:password@cluster.mongodb.net/impact-certificates
```

### **Part 3: Deploy Mint Request Receiver Lambda**

#### 3.1 Setup Project

```bash
cd mint-request-receiver
npm install
```

#### 3.2 Configure `.env`

```bash
DATABASE_NAME=impact-certificates
EVM_RPC_URL=celo,https://forno.celo.org~arbitrum,https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY~optimism,https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY~base,https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/impact-certificates
TOKEN_VALIDITY_IN_MINS=30
```

#### 3.3 Package and Deploy

```bash
npm install --production
zip -r mint-request-receiver.zip . -x "*.git*" "*.env*"
```

Using AWS CLI:

```bash
aws lambda create-function \
  --function-name mint-request-receiver \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://mint-request-receiver.zip
```

Create an API Gateway endpoint and connect it to this Lambda.

Note: Can also use AWS Management Console to deploy the AWS lambda function and connect it with an API Gateway.

### **Part 4: Deploy Minter Service Lambda**

#### 4.1 Setup Project

```bash
cd minter-service
npm install
```

#### 4.2 Configure `.env`


```jsx
DATABASE_NAME=impact_certificates
EVM_RPC_URL=celo,https://forno.celo.org~arbitrum,https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY~optimism,https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY~base,https://base-mainnet.g.alchemy.com/v2/YOUR_KEY

#Private key of the wallet authorized to perform the minting
MINT_FEE_PAYER=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5ef123784d7bf4f2ff80 
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/impact-certificates
```

#### 4.3 Package & Deploy

```bash
npm install --production
zip -r minter-service.zip . -x "*.git*" "*.env*"
```

Deploy using AWS CLI or the console.

After deployment, set up a **MongoDB trigger** to automatically call this Lambda when new documents are inserted in `mintrequests` collection. MongoDB trigger function needs to make a POST request to the API gateway URL corresponding to the lambda function, passing the inserted document in the request body.


### **Part 5: Deploy Express.js Wrapper**

#### 5.1 Setup

```bash
cd project-ic-minter
npm install
```

#### 5.2 Configure `.env`

```bash
ENVIRONMENT=production

#A solana wallet is being used to pay for uploading data to arweave. You can modify the code to make use of an EVM wallet as well
SOLANA_PROVIDER_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
SOLANA_WALLET=/path/to/file/storing/solana/private_key
IRYS_URL=https://arweave.mainnet.irys.xyz
MAX_UPLOAD_ATTEMPTS=3
MAX_API_CALL_ATTEMPTS=1

#public endpoint of the API gateway
NFT_MINT_PROTOCOL_URL=https://abcd1234s.execute-api.ap-south-1.amazonaws.com/production/v1
PROJECT_IMPACT_CERTIFICATE_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
PROJECT_IMPACT_CERTIFICATE_ISSUER_ADDRESS=0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063
PROJECT_IMPACT_CERTIFICATE_ISSUER=0xb4d6e2f0a3c9d8b7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3
EVM_RPC_URL=celo,https://forno.celo.org~arbitrum,https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY~optimism,https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY~base,https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
ATLANTIS_WEBSITE_URL=https://www.atlantisp2p.com
SERVER_PORT=8000
```

#### 5.3 Run Locally or Deploy

- Either run the express.js application locally or deploy it on the cloud (AWS). Make sure you have the endpoint URL corresponding to the application,

### **Part 6: Testing Your Deployment**

1. **Send a test payment**
    - Choose a blockchain for minting and a blockchain + token for sending mint fee. Send the mint fee to the configured address (specified in the DB) and note the corresponding transaction hash
2. **Test Mint Request**
    - Make a request for minting using API provided by express.js application

```bash
curl -X POST https://your-api/v1/mintRequest -H "Content-Type: application/json" -d '{
  "projectName": "Sample Project",
  "projectStartDate": "2025-09-18T13:40:40",
  "projectEndDate": "2025-09-25T13:40:40",
  "backerName": "Sample Organisation",
  "backerLogo": "https://orgwebsite.org/sample_image.png",
  "projectDescription": "This project was carried out in Bengaluru to promote rainwater harvesting. Over 20000 households setup rainwater harvesting which can    potentially lead to 4000000 litres of water being harvested",
  "totalFundsDeployedUSD": 50000,
  "totalImpactPointsAllocated": 2000000,
  "impactCoresAffected": ["Water", "Earth", "Energy", "Social"],
  "SDGsAffected": ["Zero hunger", "No poverty"],
  "bountyTypeWisePassAndFailCount": [
    {
      "type": "Design",
      "passCount": 20,
      "failCount": 5
    },
    {
      "type": "Code",
      "passCount": 23,
      "failCount": 2
    }
  ],
  "paymentTransactionBlockchain": "arbitrum",
  "paymentTransactionHash": "0x9f3a1c7b4e2d90f5b8c3a6e12d7f4b0c5a9e8f1d2c3b4a5e6f7091a2b3c4d5e",
  "paymentTokenAddress": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  "mintBlockchain": "arbitrum",
  "receiverAddress": "0x7c4e9a3f82b5d1a6c2f08b34e9d7ab1938f5e247"
}'
```

1. **Check Mint Status**

```bash
curl https://your-api/v1/mintStatus?requestId=YOUR_REQUEST_ID
```


### **Support & Resources**

- **GitHub:** https://github.com/AtlantisDAO1/project-impact-certificate-mint-api
- **MongoDB Docs:** https://docs.atlas.mongodb.com/
- **AWS Lambda Docs:** https://docs.aws.amazon.com/lambda/
- **Hardhat Docs:** https://hardhat.org/docs

---

## 6. Appendix

### Impact Cores

1. Water
2. Earth
3. Energy
4. Social


### Supported Bounty Types

1. Design
2. Code
3. Survey
4. Scouting
5. Writing
6. Validate
7. Volunteer
8. Content
9. Research
10. Learning
11. Harvesting
12. GHG Removal
13. Recycle
14. Restoration
15. Gardening
16. Data Science
17. Promotion
18. Regenerate
19. Training
20. General
21. Funding
22. Registration
23. Community

### Sustainable Development Goals (SDGs)

1. No poverty
2. Zero hunger
3. Good health & well-being
4. Quality education
5. Gender equality
6. Clean water & sanitation
7. Affordable & clean energy
8. Decent work & economic growth
9. Industry, innovation & infrastructure
10. Reduced inequalities
11. Sustainable cities & communities
12. Responsible consumption & production
13. Climate action
14. Life below water
15. Life on land
16. Peace, justice & strong institutions
17. Partnerships for the goals

---

## 7. License

MIT License

Copyright (c) 2025 Atlantis P2P

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) 2025 Atlantis P2P
