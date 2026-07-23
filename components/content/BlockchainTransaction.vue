<template>
  <div class="overflow-hidden bg-white dark:bg-gray-900 w-full">
    <!-- Toolbar -->
    <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
          <Icon name="uil:link" class="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
        </div>
        <div class="min-w-0">
          <h2 class="text-sm font-medium text-gray-900 dark:text-white truncate">
            Transaction Visualizer
          </h2>
          <p class="text-2xs text-gray-500 dark:text-gray-400">
            Simulated chain · {{ blocks.length + 1 }} blocks · {{ recentTransactions.length }} recent txs
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="addTransaction"
          class="inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Icon name="uil:plus" class="w-3.5 h-3.5" />
          New transaction
        </button>
        <button
          type="button"
          @click="mineBlock"
          :disabled="pendingTransactions.length === 0 || isMining"
          class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
          :class="
            pendingTransactions.length === 0 || isMining
              ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-500 cursor-pointer'
          "
        >
          <Icon
            :name="isMining ? 'svg-spinners:ring-resize' : 'uil:cube'"
            class="w-3.5 h-3.5"
          />
          {{ isMining ? 'Mining…' : 'Mine block' }}
        </button>
      </div>
    </div>

    <!-- Stats strip -->
    <div class="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-800 border-b border-gray-200 dark:border-gray-800 text-xs">
      <div class="px-4 py-2.5">
        <p class="text-2xs text-gray-500 dark:text-gray-400 mb-0.5">Chain height</p>
        <p class="font-medium text-gray-900 dark:text-white tabular-nums">{{ blocks.length + 1 }}</p>
      </div>
      <div class="px-4 py-2.5">
        <p class="text-2xs text-gray-500 dark:text-gray-400 mb-0.5">Mempool</p>
        <p class="font-medium text-gray-900 dark:text-white tabular-nums">
          {{ pendingTransactions.length }}
          <span class="text-2xs font-normal text-gray-400">pending</span>
        </p>
      </div>
      <div class="px-4 py-2.5">
        <p class="text-2xs text-gray-500 dark:text-gray-400 mb-0.5">Status</p>
        <p class="font-medium flex items-center gap-1.5 text-gray-900 dark:text-white">
          <span
            class="inline-block h-1.5 w-1.5 rounded-full"
            :class="isMining ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'"
          />
          {{ isMining ? 'Mining' : 'Idle' }}
        </p>
      </div>
    </div>

    <!-- Chain visualization -->
    <div class="px-4 py-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xs font-medium text-gray-700 dark:text-gray-300">Chain</h3>
        <span class="text-2xs text-gray-400 dark:text-gray-500">Scroll horizontally</span>
      </div>

      <div class="w-full overflow-x-auto pb-1 scrollbar-hide">
        <div class="flex items-stretch py-1 min-w-min">
          <!-- Genesis -->
          <div class="flex-shrink-0">
            <div class="w-48 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-3 transition-shadow hover:shadow-sm">
              <div class="flex items-center justify-between mb-2.5">
                <span class="inline-flex items-center rounded px-1.5 py-0.5 text-2xs font-medium bg-gray-200/80 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  Block #0
                </span>
                <span class="text-2xs text-gray-400 uppercase tracking-wide">Genesis</span>
              </div>
              <div class="font-mono text-2xs text-gray-500 dark:text-gray-400 space-y-1 border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                <div class="truncate">
                  <span class="text-gray-400">hash</span>
                  {{ shortHash(genesisBlock.hash) }}
                </div>
                <div class="truncate">
                  <span class="text-gray-400">prev</span>
                  {{ shortHash(genesisBlock.previousHash) }}
                </div>
              </div>
              <div class="flex justify-between text-2xs text-gray-500 dark:text-gray-400">
                <span>{{ formatTime(genesisBlock.timestamp) }}</span>
                <span>0 txs</span>
              </div>
            </div>
          </div>

          <!-- Mined blocks -->
          <div
            v-for="(block, index) in blocks"
            :key="block.hash"
            class="flex-shrink-0 flex items-center"
          >
            <div class="w-4 h-px bg-gray-300 dark:bg-gray-700 self-center" aria-hidden="true" />
            <div
              class="w-48 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-3 transition-all hover:shadow-sm"
              :class="{ 'ring-1 ring-blue-500/30 animate-block-in': block.isNew }"
            >
              <div class="flex items-center justify-between mb-2.5">
                <span class="inline-flex items-center rounded px-1.5 py-0.5 text-2xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400">
                  Block #{{ index + 1 }}
                </span>
                <span class="text-2xs font-medium text-blue-600/80 dark:text-blue-400/80 tabular-nums">
                  {{ block.transactions.length }} txs
                </span>
              </div>
              <div class="font-mono text-2xs text-gray-500 dark:text-gray-400 space-y-1 border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                <div class="truncate">
                  <span class="text-gray-400">hash</span>
                  {{ shortHash(block.hash) }}
                </div>
                <div class="truncate">
                  <span class="text-gray-400">prev</span>
                  {{ shortHash(block.previousHash) }}
                </div>
              </div>
              <div class="flex justify-between text-2xs text-gray-500 dark:text-gray-400">
                <span>{{ formatTime(block.timestamp) }}</span>
                <span class="tabular-nums">nonce {{ block.nonce }}</span>
              </div>
            </div>
          </div>

          <!-- Pending mempool -->
          <div
            v-if="pendingTransactions.length > 0"
            class="flex-shrink-0 flex items-center"
          >
            <div
              class="w-4 border-t border-dashed border-gray-300 dark:border-gray-600 self-center"
              aria-hidden="true"
            />
            <div class="w-48 rounded-lg border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20 p-3">
              <div class="flex items-center justify-between mb-2.5">
                <span class="inline-flex items-center rounded px-1.5 py-0.5 text-2xs font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400">
                  Mempool
                </span>
                <span class="inline-flex items-center rounded-full bg-amber-500/10 px-1.5 py-0.5 text-2xs font-medium text-amber-700 dark:text-amber-400 tabular-nums">
                  {{ pendingTransactions.length }}
                </span>
              </div>
              <div class="space-y-1.5">
                <div
                  v-for="(tx, idx) in pendingTransactions.slice(0, 3)"
                  :key="tx.id"
                  class="h-1.5 rounded-sm bg-amber-300/40 dark:bg-amber-700/30"
                  :style="{ width: `${70 + (idx * 10)}%` }"
                />
                <p
                  v-if="pendingTransactions.length > 3"
                  class="text-2xs text-amber-700/80 dark:text-amber-500/80 text-center pt-0.5"
                >
                  +{{ pendingTransactions.length - 3 }} more
                </p>
                <p
                  v-else
                  class="text-2xs text-amber-700/70 dark:text-amber-500/70 pt-0.5"
                >
                  Awaiting next block
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent transactions -->
    <div class="px-4 pb-4">
      <div class="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/40">
          <h3 class="text-xs font-medium text-gray-700 dark:text-gray-300">Recent transactions</h3>
          <span class="text-2xs text-gray-400 tabular-nums">{{ recentTransactions.length }}</span>
        </div>

        <div class="max-h-[160px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 scrollbar-thin">
          <div
            v-for="tx in recentTransactions"
            :key="tx.id"
            class="px-3 py-2.5 text-xs transition-colors"
            :class="{ 'bg-emerald-50/50 dark:bg-emerald-950/20 animate-highlight-once': tx.isNew }"
          >
            <div class="flex items-center justify-between gap-3 mb-1">
              <span class="font-mono text-gray-600 dark:text-gray-400 truncate">
                {{ shortHash(tx.id) }}
              </span>
              <span class="font-medium text-emerald-600 dark:text-emerald-400 tabular-nums whitespace-nowrap">
                {{ tx.amount }} ETH
              </span>
            </div>
            <div class="flex items-center justify-between gap-2 text-2xs text-gray-400 dark:text-gray-500 font-mono">
              <span class="truncate">From {{ shortAddr(tx.sender) }}</span>
              <Icon name="uil:arrow-right" class="w-3 h-3 flex-shrink-0 text-gray-300 dark:text-gray-600" />
              <span class="truncate text-right">To {{ shortAddr(tx.recipient) }}</span>
            </div>
          </div>

          <div
            v-if="recentTransactions.length === 0"
            class="px-3 py-8 text-center text-2xs text-gray-400 dark:text-gray-500"
          >
            No recent transactions
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const wallets = [
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
];

const calculateHash = () => {
  const characters = '0123456789abcdef';
  let hash = '0x00';
  for (let i = 0; i < 62; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return hash;
};

const generateId = () => {
  const characters = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return hash;
};

const shortHash = (value) => `${value.substring(0, 10)}…${value.slice(-4)}`;
const shortAddr = (value) => `${value.substring(0, 6)}…${value.slice(-4)}`;

const formatTime = (timestamp) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(timestamp));

const genesisBlock = ref({
  index: 0,
  timestamp: Date.now() - 120000,
  transactions: [],
  previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  hash: '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3',
  nonce: 42,
});

const blocks = ref([]);
const pendingTransactions = ref([]);
const recentTransactions = ref([]);
const isMining = ref(false);

const createTransaction = () => {
  const senderIdx = Math.floor(Math.random() * wallets.length);
  let recipientIdx;
  do {
    recipientIdx = Math.floor(Math.random() * wallets.length);
  } while (recipientIdx === senderIdx);

  return {
    id: generateId(),
    sender: wallets[senderIdx],
    recipient: wallets[recipientIdx],
    amount: parseFloat((Math.random() * 2.99 + 0.01).toFixed(2)),
    timestamp: Date.now(),
    gasUsed: Math.floor(Math.random() * 50000) + 21000,
    isNew: true,
  };
};

const addTransaction = () => {
  const newTx = createTransaction();
  pendingTransactions.value.push(newTx);
  recentTransactions.value.unshift(newTx);
  if (recentTransactions.value.length > 5) {
    recentTransactions.value.pop();
  }
  setTimeout(() => {
    newTx.isNew = false;
  }, 2000);
};

const mineBlock = async () => {
  if (pendingTransactions.value.length === 0 || isMining.value) return;

  isMining.value = true;
  await new Promise((resolve) => setTimeout(resolve, 650));

  const previousBlock =
    blocks.value.length > 0
      ? blocks.value[blocks.value.length - 1]
      : genesisBlock.value;

  const newBlock = {
    index: previousBlock.index + 1,
    timestamp: Date.now(),
    transactions: [...pendingTransactions.value],
    previousHash: previousBlock.hash,
    nonce: Math.floor(Math.random() * 10000) + 1000,
    hash: calculateHash(),
    isNew: true,
  };

  blocks.value.push(newBlock);
  pendingTransactions.value = [];

  for (const tx of newBlock.transactions) {
    if (!recentTransactions.value.some((existing) => existing.id === tx.id)) {
      tx.isNew = false;
      recentTransactions.value.unshift(tx);
    }
  }

  if (recentTransactions.value.length > 5) {
    recentTransactions.value = recentTransactions.value.slice(0, 5);
  }

  isMining.value = false;
  setTimeout(() => {
    newBlock.isNew = false;
  }, 1200);
};

onMounted(() => {
  addTransaction();
  addTransaction();
  setTimeout(() => {
    mineBlock();
  }, 800);
  setTimeout(() => {
    addTransaction();
  }, 1600);
});
</script>

<style scoped>
@keyframes highlight-once {
  0% {
    background-color: rgba(16, 185, 129, 0.08);
  }
  100% {
    background-color: transparent;
  }
}

@keyframes block-in {
  from {
    opacity: 0.6;
    transform: translateX(4px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-highlight-once {
  animation: highlight-once 2s ease-out;
}

.animate-block-in {
  animation: block-in 0.45s ease-out;
}

.text-2xs {
  font-size: 0.65rem;
  line-height: 1rem;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
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
