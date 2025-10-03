
# Impact Certificates API Documentation

## Table of Contents

- [Overview](#1-overview)
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
- [Appendix](#5-appendix)
  - [Impact Cores](#impact-cores)
  - [Supported Bounty Types](#supported-bounty-types)
  - [Sustainable Development Goals (SDGs)](#sustainable-development-goals-sdgs)

---

## 1. Overview

The **Impact Certificate Minter API** is an open-source initiative that enables projects to **mint immutable proof of impact as NFTs called impact certificates**.

Projects are broken down into **activities called bounties**. Each bounty contributes toward the overall impact of the project. Once all bounties are validated, project initiator can request the minting of an **impact certificate** that represents the impact created.

This documentation describes the available APIs for minting Impact Certificates.

---

## 2. Prerequisite: Payment Requirement

Users have the option to mint impact certificates on the following blockchains: 
| Chain Name   | Chain ID |
| -------------| ---------|
| arbitrum     | 42161    |
| base         | 8453     |
| celo         | 42220    |
| optimism     | 10       |

Before requesting the minting of an Impact Certificate, the project initiator must make a payment of **20 USD worth** in a supported token.
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

| Token   | Token Address                                | Chain    | Chain ID | Amount       |
| --------| ---------------------------------------------| -------- | -------- | -------------|
| USDC    | `0xaf88d065e77c8cC2239327C5EDb3A432268e5831` | arbitrum | 42161    | 20           |
| USDT    | `0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9` | arbitrum | 42161    | 20           |
| DAI     | `0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1` | arbitrum | 42161    | 20           |
| USDGLO  | `0x4F604735c1cF31399C6E711D5962b2B3E0225AD3` | arbitrum | 42161    | 20           |
| USDC    | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | base     | 8453     | 20           |
| DAI     | `0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb` | base     | 8453     | 20           |
| USDT    | `0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2` | base     | 8453     | 20           |
| USDGLO  | `0x4F604735c1cF31399C6E711D5962b2B3E0225AD3` | base     | 8453     | 20           |
| USDC    | `0xcebA9300f2b948710d2653dD7B07f33A8B32118C` | celo     | 42220    | 20           |
| USDT    | `0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e` | celo     | 42220    | 20           |
| DAI     | `0xE4fE50cdD716522A56204352f00AA110F731932d` | celo     | 42220    | 20           |
| cUSD    | `0x765DE816845861e75A25fCA122bb6898B8B1282a` | celo     | 42220    | 20           |
| USDGLO  | `0x4F604735c1cF31399C6E711D5962b2B3E0225AD3` | celo     | 42220    | 20           |
| USDC    | `0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85` | optimism | 10       | 20           |
| DAI     | `0xda10009cbd5d07dd0cecc66161fc93d7c9000da1` | optimism | 10       | 20           |
| USDT    | `0x94b008aA00579c1307B0EF2c499aD98a8ce58e58` | optimism | 10       | 20           |
| USDGLO  | `0x4F604735c1cF31399C6E711D5962b2B3E0225AD3` | optimism | 10       | 20           |


### 2. Supported Blockchains For Minting/Payment

| Chain Name   | Chain ID |
| -------------| ---------|
| arbitrum     | 42161    |
| base         | 8453     |
| celo         | 42220    |
| optimism     | 10       |

---

## 5. Appendix

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
