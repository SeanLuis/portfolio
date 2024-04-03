---
title: "Criando um Projeto Backend com NestJS, TypeScript e Hedera Hashgraph SDK"
description: "Aprenda a configurar um projeto backend usando NestJS e TypeScript e a interagir com contratos inteligentes utilizando o Hedera Hashgraph SDK"
published: 2024/04/02
slug: "criando-um-projeto-backend-com-nestjs-typescript-e-hedera-hashgraph-sdk"
---

![NestJs + Typescript + Hashgraph](/articles/nestjs-hedera-ts.jpg)

**Introdução**

NestJS é um framework poderoso para construir aplicações server-side eficientes e escaláveis em Node.js. Quando combinado com TypeScript e o Hedera Hashgraph SDK, desenvolvedores podem criar soluções de blockchain robustas. Este guia irá levá-lo através dos passos para iniciar um projeto NestJS, configurá-lo para usar TypeScript e integrá-lo com o Hedera Hashgraph SDK.

**Pré-requisitos**

- Node.js instalado (v16.x ou superior)
- Conhecimento básico de TypeScript e Node.js

**Passo 1: Configurando o Projeto NestJS**

1. Primeiro, instale o CLI do NestJS globalmente com o comando:

```bash
npm i -g @nestjs/cli
```

2. Crie um novo projeto NestJS:

```bash
nest new nome-do-projeto
```

3. Entre na pasta do projeto:

```bash
cd nome-do-projeto
```

**Passo 2: Adicionando o Hedera Hashgraph SDK**

1. Instale o SDK do Hedera Hashgraph como uma dependência do seu projeto:

```bash
npm install @hashgraph/sdk
```

**Passo 3: Configuração Básica do Hedera**

1. Antes de interagir com a rede Hedera, você precisa configurar suas credenciais. Crie um arquivo `.env` na raiz do seu projeto e adicione sua Account ID e Private Key:

```plaintext
HEDERA_ACCOUNT_ID=sua_account_id
HEDERA_PRIVATE_KEY=sua_private_key
```

**Nota**: Substitua `sua_account_id` e `sua_private_key` pelas suas credenciais da conta Hedera.

2. Utilize o módulo `ConfigService` do NestJS ou uma biblioteca como `dotenv` para carregar suas variáveis de ambiente de forma segura.

**Passo 4: Interagindo com um Contrato Inteligente**

1. Crie um serviço dentro do NestJS para encapsular sua lógica de interação com a rede Hedera. Você pode usar o CLI do NestJS:

```bash
nest generate service hedera
```

2. Dentro do seu serviço, importe o SDK do Hedera e utilize as credenciais para configurar o cliente:

```typescript
import { Injectable } from '@nestjs/common';
import { Client, AccountId, PrivateKey } from '@hashgraph/sdk';

@Injectable()
export class HederaService {
  private client: Client;
  private MY_ACCOUNT_ID = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID);
  private MY_PRIVATE_KEY = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);

  constructor() {
    this.client = Client.forTestnet();
    this.client.setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);
  }

  // Métodos para interagir com contratos aqui
}
```

**Passo 5: Executando uma Função do Contrato**

Vamos supor que você tem um contrato inteligente já implantado que você deseja interagir. Aqui está como você pode chamar uma função do contrato:

```typescript
import { Client, ContractExecuteTransaction, ContractFunctionParameters } from "@hashgraph/sdk";

async function callContractFunction(client: Client, contractIdStr: string, functionName: string, parameters: any[]) {
  // Converter a sequência do contrato em um objeto contratual
  const contractId = ContractId.fromString(contractIdStr);

  // Crie e configure a transação para chamar a função do contrato
  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(100000) // Estabelecer um limite de gás para execução
    .setFunction(functionName, 
        new ContractFunctionParameters().addString(parameters[0]).addInt64(parameters[1]))
    );

  // Assine e envie a transação para o nó Hedera e aguarde o recibo
  const submitTxResponse = await contractExecuteTx.execute(client);
  const receipt = await submitTxResponse.getReceipt(client);

  // Obter o resultado da chamada para a função do contrato
  const contractFunctionResult = await receipt.getContractExecuteResult();
  console.log("El resultado de la función es:", contractFunctionResult);

  return contractFunctionResult;
}
```

**Conclusão**

Você configurou com sucesso um projeto NestJS para usar TypeScript e interagir com a rede Hedera Hashgraph! Este guia cobriu a configuração básica e como realizar chamadas de contrato inteligente. À medida que você avança, pode explorar mais funcionalidades do SDK do Hedera e expandir seu projeto para incluir transações complexas, gerenciamento de tokens e muito mais.
