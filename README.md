
# 🌍 Impact Certificates API Documentation

## 📑 Table of Contents

- [📖 Overview](#-overview)
- [⚠️ Prerequisite: Payment Requirement](#️-prerequisite-payment-requirement)
- [🔑 API Endpoints](#-api-endpoints)
  - [1. Mint Impact Certificate API](#1-mint-impact-certificate-api)
    - [✅ Request Body](#-request-body)
    - [📋 Field Descriptions](#-field-descriptions)
    - [🔄 Response](#-response)
    - [❌ Failure Responses](#-failure-responses)
  - [2. Check Certificate Status API](#2-check-certificate-status-api)
    - [🔄 Response](#-response-1)
    - [📋 Status Values](#-status-values)
    - [❌ Failure Responses](#-failure-responses-1)
- [📑 Reference Tables](#-reference-tables)
  - [1. Supported Payment Tokens](#1-supported-payment-tokens)
  - [2. Supported Minting Chains](#2-supported-minting-chains)
- [📚 Appendix](#-appendix)
  - [🌱 Impact Cores](#-impact-cores)
  - [🎯 Supported Bounty Types](#-supported-bounty-types)
  - [🌐 Sustainable Development Goals (SDGs)](#-sustainable-development-goals-sdgs)

---

## 📖 Overview

The **Impact Certificates (ICs) System** is an open-source initiative that enables projects to **mint verifiable certificates of impact**.

Projects are broken down into **bounties**. Each bounty contributes toward the overall impact of the project. Once validated, contributors and backers can request the minting of an **on-chain certificate** that represents the verified impact.

This documentation describes the available APIs for minting and verifying Impact Certificates.

---

## ⚠️ Prerequisite: Payment Requirement

Before requesting the minting of an Impact Certificate, the project initiator or contributor must make a payment of **20 USD worth** in a supported token.

- This payment ensures authenticity and prevents spam minting requests.
- The payment details (transaction hash, token address, chain) must be included in the `mintRequest` API call.

---

## 🔑 API Endpoints

### 1. Mint Impact Certificate API

**Endpoint:**

```
POST {base_url}/mintRequest
```

**Description:**\
This API mints an **Impact Certificate (IC)** for a completed project or a set of bounties, once the required payment has been made.

---

#### ✅ Request Body

```json
{
  "projectName": "Sample Project",
  "projectStartDate": "2025-09-18T13:40:40",
  "projectEndDate": "2025-09-25T13:40:40",
  "backerName": "Sample Organisation",
  "backerLogo": "https://orgwebsite.org/sample_image.png",
  "projectDescription": "This project was carried out in Bengaluru to promote rainwater harvesting. Over 20000 households setup rainwater harvesting which can potentially lead to 4000000 litres of water being harvested",
  "totalFundsDeployedUSD": 50000,
  "totalImpactPointsAllocated": 2000000,
  "impactCoresAffected": ["Water", "Earth", "Energy", "Social"],
  "SDGsAffected": ["zero hunger", "no poverty"],
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
  "paymentTransactionHash": "0xsomerandomtransactionhash",
  "paymentTokenAddress": "0xSomerandomaddress",
  "mintBlockchain": "optimism sepolia",
  "receiverAddress": "0xsomerandomaddress"
}
```

---

#### 📋 Field Descriptions

| Field                            | Type          | Description                                                               |
| -------------------------------- | ------------- | ------------------------------------------------------------------------- |
| `projectName`                    | string        | Title of the project, shown as the IC title.                              |
| `projectStartDate`               | datetime      | Start date of the project impact.                                         |
| `projectEndDate`                 | datetime      | End date of the project impact.                                           |
| `backerName`                     | string        | Organization backing the project.                                         |
| `backerLogo`                     | URL           | Logo of the backing organization.                                         |
| `projectDescription`             | string        | Detailed description of the project and its outcomes.                     |
| `totalFundsDeployedUSD`          | number        | Total funds utilized for the project in USD.                              |
| `totalImpactPointsAllocated`     | number        | Points allocated for contributions to this project.                       |
| `impactCoresAffected`            | array[string] | List of impact cores targeted. Options: `[Water, Earth, Energy, Social]`. |
| `SDGsAffected`                   | array[string] | Sustainable development goals achieved. Full list in Appendix.            |
| `bountyTypeWisePassAndFailCount` | array[object] | Activity/bounty performance metrics.                                      |
| → `type`                         | string        | Activity type (see activity list in Appendix).                            |
| → `passCount`                    | number        | Count of successful submissions.                                          |
| → `failCount`                    | number        | Count of failed submissions.                                              |
| `paymentTransactionBlockchain`   | string        | Blockchain used for payment.                                              |
| `paymentTransactionHash`         | string        | Transaction hash of payment.                                              |
| `paymentTokenAddress`            | string        | Token address used for payment.                                           |
| `mintBlockchain`                 | string        | Blockchain where the Impact Certificate will be minted.                   |
| `receiverAddress`                | string        | Address that will receive the minted IC.                                  |

---

#### 🔄 Response

```json
{
  "requestId": "fsfdslfjlld"
}
```

---

#### ❌ Failure Responses

| HTTP Code | Error                    | Description                                   |
| --------- | ------------------------ | --------------------------------------------- |
| 400       | `INVALID_REQUEST`        | Missing or invalid fields in request.         |
| 402       | `PAYMENT_REQUIRED`       | No valid $20 payment found.                  |
| 404       | `TOKEN_NOT_SUPPORTED`    | Payment token not supported.                  |
| 409       | `MINT_ALREADY_REQUESTED` | Mint request already exists for this project. |
| 500       | `INTERNAL_ERROR`         | Unexpected server-side error.                 |

---

### 2. Check Certificate Status API

**Endpoint:**

```
GET {base_url}/mintStatus?requestId=<request_id>
```

**Description:**\
Checks the status of a previously requested Impact Certificate.

---

#### 🔄 Response

```json
{
  "status": "MINTED",
  "transactionHash": "0xsometransactionhash"
}
```

---

#### 📋 Status Values

- `MINT_REQUESTED` → Request has been received.
- `MINTING` → Certificate is being minted on-chain.
- `MINTED` → Certificate successfully minted.

---

#### ❌ Failure Responses

| HTTP Code | Error                | Description                                   |
| --------- | -------------------- | --------------------------------------------- |
| 400       | `INVALID_REQUEST_ID` | The requestId provided is invalid.            |
| 404       | `REQUEST_NOT_FOUND`  | No certificate request exists with this ID.   |
| 500       | `STATUS_FETCH_ERROR` | Unable to fetch status due to internal issue. |

---

## 📑 Reference Tables

### 1. Supported Payment Tokens

| Token | Token Address       | Chain    | Chain ID | Amount (USD) |
| ----- | ------------------- | -------- | -------- | ------------ |
| USDC  | `0xSomeUSDCAddress` | Arbitrum | 42161    | 20 USD       |
| DAI   | `0xSomeDAIAddress`  | Arbitrum | 42161    | 20 USD       |
| USDT  | `0xSomeUSDTAddress` | Arbitrum | 42161    | 20 USD       |

*(Extendable for other chains and tokens.)*

---

### 2. Supported Minting Chains

| Chain Name       | Network |
| ---------------- | ------- |
| Ethereum Sepolia | Testnet |
| Optimism Sepolia | Testnet |
| Polygon Mumbai   | Testnet |
| Arbitrum Sepolia | Testnet |

---

## 📚 Appendix

### 🌱 Impact Cores

`[Water, Earth, Energy, Social]`

### 🎯 Supported Bounty Types

`[Design, Code, Survey, Scouting, Writing, Validate, Volunteer, Content, Research, Learning, Harvesting, GHG Removal, Recycle, Restoration, Gardening, Data Science, Promotion, Regenerate, Training, General, Funding, Registration, Community]`

### 🌐 Sustainable Development Goals (SDGs)

1. no poverty
2. zero hunger
3. good health & well-being
4. quality education
5. gender equality
6. clean water & sanitation
7. affordable & clean energy
8. decent work & economic growth
9. industry, innovation & infrastructure
10. reduced inequalities
11. sustainable cities & communities
12. responsible consumption & production
13. climate action
14. life below water
15. life on land
16. peace, justice & strong institutions
17. partnerships for the goals
