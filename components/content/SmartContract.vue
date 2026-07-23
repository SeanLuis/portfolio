<template>
  <div class="overflow-hidden bg-white dark:bg-gray-900">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
          <Icon name="uil:file-contract" class="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h2 class="text-sm font-medium text-gray-900 dark:text-white truncate">
              {{ contractInfo.name }}
            </h2>
            <span class="text-2xs font-mono text-gray-400 dark:text-gray-500">
              {{ contractInfo.symbol }}
            </span>
          </div>
          <p class="text-2xs font-mono text-gray-500 dark:text-gray-400 truncate">
            {{ shortenAddress(contractInfo.address) }}
          </p>
        </div>
      </div>

      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-2xs font-medium"
        :class="
          isCompiling
            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
        "
      >
        <span
          class="h-1.5 w-1.5 rounded-full"
          :class="isCompiling ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'"
        />
        {{ isCompiling ? 'Compiling' : 'Active' }}
      </span>
    </div>

    <!-- Source preview -->
    <div class="px-4 pt-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-xs font-medium text-gray-700 dark:text-gray-300">Contract source</h3>
        <span class="text-2xs text-gray-400">Solidity ^0.8.0</span>
      </div>
      <div class="relative rounded-lg overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800">
        <div
          class="text-xs font-mono p-3 bg-gray-950 text-gray-300 max-h-[160px] overflow-y-auto scrollbar-thin leading-relaxed"
          :class="{ 'opacity-40': isCompiling }"
        >
          <pre><code>{{ contractCode }}</code></pre>
        </div>
        <div
          v-if="isCompiling"
          class="absolute inset-0 flex items-center justify-center bg-gray-950/50 backdrop-blur-[1px]"
        >
          <div class="inline-flex items-center gap-2 rounded-md bg-gray-900/90 px-3 py-1.5 ring-1 ring-white/10">
            <Icon name="svg-spinners:ring-resize" class="w-3.5 h-3.5 text-blue-400" />
            <span class="text-xs text-gray-100">Compiling contract…</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Interaction -->
    <div class="px-4 py-4">
      <div class="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div class="px-3 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/40 flex items-center justify-between">
          <h3 class="text-xs font-medium text-gray-700 dark:text-gray-300">Interact</h3>
          <div class="flex items-baseline gap-1.5">
            <span class="text-2xs text-gray-400">Balance</span>
            <span class="text-xs font-mono font-medium text-gray-900 dark:text-white tabular-nums">
              {{ tokenBalance }} DEMO
            </span>
          </div>
        </div>

        <div class="p-3 space-y-3">
          <!-- Mint -->
          <div>
            <label class="block text-2xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              Mint tokens
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model="mintAmount"
                type="number"
                min="1"
                max="100"
                class="flex-1 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-gray-100 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Amount"
              />
              <button
                type="button"
                @click="mintTokens"
                class="inline-flex items-center justify-center rounded-md bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-medium py-1.5 px-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[5.5rem]"
                :disabled="isProcessing || isCompiling"
              >
                {{ isProcessing ? 'Pending…' : 'Mint' }}
              </button>
            </div>
          </div>

          <!-- Transfer -->
          <div>
            <label class="block text-2xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              Transfer tokens
            </label>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <input
                  v-model="transferAddress"
                  type="text"
                  class="flex-1 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-mono text-gray-900 dark:text-gray-100 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Recipient address"
                />
                <input
                  v-model="transferAmount"
                  type="number"
                  min="1"
                  :max="tokenBalance"
                  class="w-20 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-gray-100 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Amt"
                />
              </div>
              <button
                type="button"
                @click="transferTokens"
                class="w-full inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-xs font-medium py-1.5 px-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isProcessing || isCompiling || !isTransferValid"
              >
                {{ isProcessing ? 'Pending…' : 'Transfer' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- History -->
    <div class="px-4 pb-4">
      <div class="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div class="px-3 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/40 flex items-center justify-between">
          <h3 class="text-xs font-medium text-gray-700 dark:text-gray-300">Transaction history</h3>
          <span class="text-2xs text-gray-400 tabular-nums">{{ transactionHistory.length }}</span>
        </div>

        <div class="max-h-[148px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 scrollbar-thin">
          <div
            v-for="(tx, index) in transactionHistory"
            :key="index"
            class="px-3 py-2.5 text-xs animate-fade-in"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <span
                    class="inline-flex items-center rounded px-1.5 py-0.5 text-2xs font-medium"
                    :class="
                      tx.type === 'mint'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                        : 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                    "
                  >
                    {{ tx.type === 'mint' ? 'Mint' : 'Transfer' }}
                  </span>
                  <span class="font-mono text-gray-700 dark:text-gray-300 tabular-nums">
                    {{ tx.amount }} DEMO
                  </span>
                </div>
                <p
                  v-if="tx.type === 'transfer'"
                  class="text-2xs font-mono text-gray-400 truncate"
                >
                  To {{ shortenAddress(tx.to) }}
                </p>
                <div
                  v-if="tx.status === 'pending'"
                  class="mt-1 inline-flex items-center gap-1 text-2xs font-medium text-amber-600 dark:text-amber-400"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Pending confirmation…
                </div>
                <div
                  v-else
                  class="mt-1 inline-flex items-center gap-1 text-2xs font-medium text-emerald-600 dark:text-emerald-400"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Confirmed · Block #{{ tx.blockNumber }}
                </div>
              </div>
              <span class="font-mono text-2xs text-gray-400 whitespace-nowrap tabular-nums">
                {{ formatTime(tx.timestamp) }}
              </span>
            </div>
          </div>

          <div
            v-if="transactionHistory.length === 0"
            class="px-3 py-8 text-center text-2xs text-gray-400 dark:text-gray-500"
          >
            No transactions yet
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DemoToken {
    string public name = "Demo Token";
    string public symbol = "DEMO";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        totalSupply = 0;
    }

    function mint(address to, uint256 amount) public {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
}`;

const contractInfo = reactive({
  name: 'DemoToken',
  symbol: 'DEMO',
  address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
  owner: '0x61AaA1A8c6a3A4962129395ede91c799D5dcB655',
});

const tokenBalance = ref(0);
const mintAmount = ref(10);
const transferAddress = ref('');
const transferAmount = ref(0);
const isProcessing = ref(false);
const isCompiling = ref(false);
const transactionHistory = ref([]);

const validAddresses = [
  '0xBEC5E1AF5b4bE3cF8A4eE0B1F59371d81642aC8e',
  '0xA8ee341d2D341C2f965Ec62F398707cb0DCf6AB2',
  '0xcB9ef28Fb5562C84CC51E7aCe78641a4C6418129',
];

const isTransferValid = computed(() => {
  return (
    transferAddress.value &&
    transferAmount.value > 0 &&
    transferAmount.value <= tokenBalance.value
  );
});

const shortenAddress = (address) => `${address.slice(0, 6)}…${address.slice(-4)}`;

const formatTime = (timestamp) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(timestamp));

const simulateTransaction = (txData, callback) => {
  isProcessing.value = true;

  const tx = {
    ...txData,
    status: 'pending',
    timestamp: Date.now(),
  };

  transactionHistory.value.unshift(tx);

  setTimeout(() => {
    tx.status = 'confirmed';
    tx.blockNumber = Math.floor(Math.random() * 1000) + 15000000;
    if (callback) callback(tx);
    isProcessing.value = false;
  }, Math.random() * 2000 + 1000);
};

const mintTokens = () => {
  const amount = parseInt(mintAmount.value);
  if (isNaN(amount) || amount <= 0) return;

  simulateTransaction(
    {
      type: 'mint',
      amount,
      from: '0x0000000000000000000000000000000000000000',
      to: contractInfo.owner,
    },
    () => {
      tokenBalance.value += amount;
    }
  );
};

const transferTokens = () => {
  const amount = parseInt(transferAmount.value);
  const to = transferAddress.value;

  if (isNaN(amount) || amount <= 0 || amount > tokenBalance.value || !to) {
    return;
  }

  simulateTransaction(
    {
      type: 'transfer',
      amount,
      from: contractInfo.owner,
      to,
    },
    () => {
      tokenBalance.value -= amount;
      transferAmount.value = 0;
      transferAddress.value = '';
    }
  );
};

const compileContract = () => {
  isCompiling.value = true;
  setTimeout(() => {
    isCompiling.value = false;
  }, 2000);
};

onMounted(() => {
  compileContract();

  setTimeout(() => {
    tokenBalance.value = 100;
    transactionHistory.value = [
      {
        type: 'mint',
        amount: 100,
        from: '0x0000000000000000000000000000000000000000',
        to: contractInfo.owner,
        status: 'confirmed',
        timestamp: Date.now() - 3600000,
        blockNumber: 15276490,
      },
    ];
    transferAddress.value =
      validAddresses[Math.floor(Math.random() * validAddresses.length)];
  }, 2500);
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.65rem;
  line-height: 1rem;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.35);
  border-radius: 9999px;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.55);
}
</style>
