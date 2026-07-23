---
title: "Building a Backend Project with NestJS, TypeScript, and the Hedera Hashgraph SDK"
description: "Learn how to set up a NestJS + TypeScript backend and interact with smart contracts using the Hedera Hashgraph SDK."
published: 2024/04/02
slug: "criando-um-projeto-backend-com-nestjs-typescript-e-hedera-hashgraph-sdk"
---

![NestJs + Typescript + Hashgraph](/articles/nestjs-hedera-ts.jpg)

**Introduction**

NestJS is a strong choice for building efficient, scalable Node.js backends. Combined with TypeScript and the Hedera Hashgraph SDK, you can ship blockchain-aware services with clear structure and typed APIs.

**Prerequisites**

- Node.js installed (v16.x or newer)
- Basic TypeScript and Node.js familiarity

**Step 1: Scaffold a NestJS project**

```bash
npx @nestjs/cli new hedera-backend
cd hedera-backend
```

**Step 2: Add the Hedera SDK**

```bash
npm install @hashgraph/sdk
```

**Step 3: Configure credentials**

Store account ID and private key in environment variables (never commit secrets). Create a Hedera client module that initializes `Client.forTestnet()` or `Client.forMainnet()` and injects it into services.

**Step 4: Interact with the network**

Typical flows include:

- Creating and transferring HBAR
- Submitting messages to Hedera Consensus Service (HCS)
- Calling smart contracts deployed on Hedera

**Takeaway**

NestJS modules + the Hedera SDK make it straightforward to isolate ledger concerns behind services, keep controllers thin, and test business logic independently of network calls.
