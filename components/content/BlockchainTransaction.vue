<template>
  <div class="px-4 py-5 bg-white dark:bg-gray-900 w-full">
    <div class="flex flex-col space-y-6">
      <!-- Header with Controls -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-base font-medium text-gray-900 dark:text-white">Blockchain Visualizer</h2>
        <div class="flex gap-3">
          <button 
            @click="addTransaction" 
            class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 py-1.5 px-3 rounded-md text-xs font-medium transition-colors duration-200 flex items-center"
          >
            <svg class="mr-1.5 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Nueva Transacción
          </button>
          <button 
            @click="mineBlock" 
            :disabled="pendingTransactions.length === 0"
            :class="[
              'py-1.5 px-3 rounded-md text-xs font-medium transition-colors duration-200 flex items-center',
              pendingTransactions.length === 0 
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed' 
                : 'bg-gray-800 hover:bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer'
            ]"
          >
            <svg class="mr-1.5 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            Minar Bloque
          </button>
        </div>
      </div>
      
      <!-- Blockchain Visualization -->
      <div class="w-full overflow-x-auto pb-1 scrollbar-hide">
        <div class="flex pb-2 pt-1">
          <!-- Genesis Block -->
          <div class="flex-shrink-0">
            <div class="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md w-44 min-w-[11rem] transition-shadow hover:shadow-sm">
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center bg-gray-200/70 dark:bg-gray-700/70 text-xs px-1.5 rounded-sm">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Bloque #0</span>
                </div>
                <span class="text-2xs font-medium text-gray-400 dark:text-gray-500">Genesis</span>
              </div>
              <div class="font-mono text-2xs mb-1 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-1.5">
                <div class="truncate">
                  <span class="text-gray-400 dark:text-gray-500">hash:</span> {{ genesisBlock.hash.substring(0, 14) }}...
                </div>
              </div>
              <div class="flex justify-between text-2xs text-gray-500 dark:text-gray-400">
                <span>{{ new Date(genesisBlock.timestamp).toLocaleTimeString() }}</span>
                <span>0 tx</span>
              </div>
            </div>
          </div>
          
          <!-- Mined Blocks -->
          <div 
            v-for="(block, index) in blocks" 
            :key="index"
            class="flex-shrink-0 flex items-center group"
          >
            <!-- Connector - Ajustado para conectar mejor los bloques -->
            <div class="w-5 h-[1px] bg-gray-300 dark:bg-gray-700 self-center"></div>
            
            <!-- Block -->
            <div
              class="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-3 rounded-md w-44 min-w-[11rem] transition-all hover:shadow-sm"
            >
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center bg-blue-100 dark:bg-blue-900/30 text-xs px-1.5 rounded-sm">
                  <span class="font-medium text-blue-700 dark:text-blue-400">Bloque #{{ index + 1 }}</span>
                </div>
                <span class="text-2xs font-medium text-blue-400 dark:text-blue-500">{{ block.transactions.length }} txs</span>
              </div>
              <div class="font-mono text-2xs mb-1 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-1.5">
                <div class="truncate">
                  <span class="text-gray-400 dark:text-gray-500">hash:</span> {{ block.hash.substring(0, 14) }}...
                </div>
                <div class="truncate">
                  <span class="text-gray-400 dark:text-gray-500">prev:</span> {{ block.previousHash.substring(0, 14) }}...
                </div>
              </div>
              <div class="flex justify-between text-2xs text-gray-500 dark:text-gray-400">
                <span>{{ new Date(block.timestamp).toLocaleTimeString() }}</span>
                <span>nonce: {{ block.nonce }}</span>
              </div>
            </div>
          </div>
          
          <!-- Pending Transaction Pool (if any) -->
          <div v-if="pendingTransactions.length > 0" class="flex-shrink-0 flex items-center">
            <!-- Connector -->
            <div class="w-5 h-[1px] border-t border-dashed border-gray-300 dark:border-gray-700 self-center"></div>
            
            <!-- Pending Pool -->
            <div class="border border-gray-200 dark:border-gray-800 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-md w-44 min-w-[11rem] transition-all">
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center bg-amber-100 dark:bg-amber-900/30 text-xs px-1.5 rounded-sm">
                  <span class="font-medium text-amber-700 dark:text-amber-500">Pendientes</span>
                </div>
                <span class="bg-amber-500/10 text-amber-700 dark:text-amber-500 text-2xs px-1.5 py-0.5 rounded-full">
                  {{ pendingTransactions.length }}
                </span>
              </div>
              <div class="mt-2 space-y-1.5">
                <div v-for="(tx, idx) in pendingTransactions.slice(0, 2)" :key="idx" 
                     class="bg-amber-200/20 dark:bg-amber-700/20 h-1.5 rounded-sm"></div>
                <div v-if="pendingTransactions.length > 2" 
                     class="text-2xs text-amber-600 dark:text-amber-500/70 text-center">+{{ pendingTransactions.length - 2 }} más</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Transaction List -->
      <div>
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-xs font-medium text-gray-700 dark:text-gray-400">Transacciones recientes</h3>
          <span class="text-2xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
            {{ recentTransactions.length }}
          </span>
        </div>
        <div class="space-y-1.5 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin">
          <div 
            v-for="(tx, idx) in recentTransactions" 
            :key="idx"
            class="bg-white dark:bg-gray-800/50 p-2 rounded-md border border-gray-100 dark:border-gray-800 text-xs transition-all"
            :class="{ 'animate-highlight-once': tx.isNew }"
          >
            <div class="flex justify-between mb-1">
              <span class="font-mono text-gray-600 dark:text-gray-400">{{ tx.id.substring(0, 6) }}...</span>
              <span class="font-medium text-green-600 dark:text-green-500">{{ tx.amount }} ETH</span>
            </div>
            <div class="flex justify-between text-gray-400 dark:text-gray-500 text-2xs">
              <span class="truncate max-w-[45%]">De: {{ tx.sender.substring(0, 10) }}...</span>
              <span class="truncate max-w-[45%]">Para: {{ tx.recipient.substring(0, 10) }}...</span>
            </div>
          </div>
          
          <div v-if="recentTransactions.length === 0" class="text-center py-3 text-2xs text-gray-400 dark:text-gray-500">
            No hay transacciones recientes
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Direcciones reales del ecosistema Ethereum para mayor realismo
const wallets = [
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap Router
  '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // UNI Token
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
  '0xdAC17F958D2ee523a2206206994597C13D831ec7'  // USDT
];

// Simulación de hash basada en caracteres alfanuméricos aleatorios
const calculateHash = (block) => {
  // Simulamos un hash real de Ethereum (64 caracteres hexadecimales)
  const characters = '0123456789abcdef';
  let hash = '0x';
  
  // Generamos los primeros caracteres para simular un hash con ceros iniciales (prueba de trabajo)
  hash += '00';
  
  // Generamos el resto del hash (62 caracteres)
  for (let i = 0; i < 62; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return hash;
};

// Generador de ID único para transacciones
const generateId = () => {
  // Formato similar a un hash de transacción Ethereum
  const characters = '0123456789abcdef';
  let hash = '0x';
  
  // Generamos 64 caracteres hexadecimales
  for (let i = 0; i < 64; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return hash;
};

// Blockchain data structure
const genesisBlock = ref({
  index: 0,
  timestamp: Date.now() - 120000, // 2 minutos atrás para más contexto
  transactions: [],
  previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  // Hash real del bloque génesis de Ethereum
  hash: '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3',
  nonce: 42
});

const blocks = ref([]);
const pendingTransactions = ref([]);
const recentTransactions = ref([]);

// Generate a new transaction
const createTransaction = () => {
  // Random sender and recipient
  const senderIdx = Math.floor(Math.random() * wallets.length);
  let recipientIdx;
  do {
    recipientIdx = Math.floor(Math.random() * wallets.length);
  } while (recipientIdx === senderIdx);
  
  // Random amount (0.01 to 3 ETH) con dos decimales para mayor realismo
  const amount = parseFloat((Math.random() * 2.99 + 0.01).toFixed(2));
  
  // Crear transacción con formato realista
  return {
    id: generateId(),
    sender: wallets[senderIdx],
    recipient: wallets[recipientIdx],
    amount,
    timestamp: Date.now(),
    gasUsed: Math.floor(Math.random() * 50000) + 21000, // Gas de una tx básica ETH
    isNew: true
  };
};

// Add a transaction to pending pool
const addTransaction = () => {
  const newTx = createTransaction();
  
  // Añadir a transacciones pendientes
  pendingTransactions.value.push(newTx);
  
  // Añadir al historial de transacciones recientes 
  recentTransactions.value.unshift(newTx);
  
  // Mantener solo las 5 transacciones más recientes
  if (recentTransactions.value.length > 5) {
    recentTransactions.value.pop();
  }
  
  // Quitar el estado "new" después de la animación
  setTimeout(() => {
    newTx.isNew = false;
  }, 2000);
};

// Simular minería con prueba de trabajo
const mineBlock = () => {
  if (pendingTransactions.value.length === 0) return;
  
  const previousBlock = blocks.value.length > 0 ? blocks.value[blocks.value.length - 1] : genesisBlock.value;
  
  // Create new block
  const newBlock = {
    index: previousBlock.index + 1,
    timestamp: Date.now(),
    transactions: [...pendingTransactions.value],
    previousHash: previousBlock.hash,
    nonce: Math.floor(Math.random() * 10000) + 1000 // Simular nonce para PoW
  };
  
  // Hash del bloque
  newBlock.hash = calculateHash(newBlock);
  
  // Añadir el bloque y limpiar transacciones pendientes
  blocks.value.push(newBlock);
  pendingTransactions.value = [];
  
  // Agregar transacciones al historial reciente (si no estaban ya)
  for (const tx of newBlock.transactions) {
    if (!recentTransactions.value.some(existing => existing.id === tx.id)) {
      tx.isNew = false; // Ya no son nuevas al estar minadas
      recentTransactions.value.unshift(tx);
    }
  }
  
  // Limitar historial de transacciones
  if (recentTransactions.value.length > 5) {
    recentTransactions.value = recentTransactions.value.slice(0, 5);
  }
};

// Initialize with some data
onMounted(() => {
  // Agregar un bloque inicial con algunas transacciones
  // para que la visualización no empiece vacía
  addTransaction();
  addTransaction();
  
  // Minar un bloque para iniciar
  setTimeout(() => {
    mineBlock();
  }, 800);
  
  // Añadir otra transacción para dejar algo pendiente
  setTimeout(() => {
    addTransaction();
  }, 1500);
});
</script>

<style scoped>
@keyframes highlight-once {
  0% { background-color: rgba(16, 185, 129, 0.05); }
  30% { background-color: rgba(16, 185, 129, 0.12); }
  100% { background-color: transparent; }
}

.animate-highlight-once {
  animation: highlight-once 2s ease-out;
}

.text-2xs {
  font-size: 0.65rem;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Thin scrollbar style */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 9999px;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}
</style>
