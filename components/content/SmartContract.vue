<template>
  <div class="p-5 bg-gray-100 dark:bg-gray-900">
    <!-- Contract Panel -->
    <div class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-sm font-semibold dark:text-white">Contrato: {{ contractInfo.name }}</h3>
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono text-gray-500 dark:text-gray-400">
            {{ shortenAddress(contractInfo.address) }}
          </span>
          <span 
            class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          >
            <span class="w-1.5 h-1.5 inline-block rounded-full bg-green-500 mr-1 animate-pulse"></span>
            Activo
          </span>
        </div>
      </div>
      
      <!-- Contract Code Preview -->
      <div class="relative">
        <div
          class="text-xs font-mono p-3 rounded-md bg-gray-800 text-gray-200 max-h-[180px] overflow-y-auto"
          :class="{ 'opacity-40': isCompiling }"
        >
          <pre><code ref="codeBlock">{{ contractCode }}</code></pre>
        </div>
        
        <div v-if="isCompiling" class="absolute inset-0 flex items-center justify-center">
          <div class="bg-gray-800/80 px-3 py-1.5 rounded-md flex items-center gap-2">
            <svg class="animate-spin h-4 w-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm text-white">Compilando...</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Interaction Panel -->
    <div class="bg-white dark:bg-gray-800 rounded-md border dark:border-gray-700 p-3 mb-4">
      <h3 class="text-xs font-semibold mb-2 dark:text-gray-200">Interactúa con el Contrato</h3>
      
      <div class="space-y-3">
        <!-- Balance View -->
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-600 dark:text-gray-400">Balance del Token:</span>
          <span class="text-sm font-medium text-gray-900 dark:text-gray-100 font-mono">{{ tokenBalance }} DEMO</span>
        </div>
        
        <!-- Mint Tokens Form -->
        <div class="flex items-center gap-2">
          <div class="flex-1">
            <input
              v-model="mintAmount"
              type="number"
              min="1"
              max="100"
              class="w-full text-xs rounded-md bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 py-1 px-2"
              placeholder="Cantidad"
            />
          </div>
          <button
            @click="mintTokens"
            class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1 px-3 rounded-md transition-colors"
            :disabled="isProcessing"
          >
            {{ isProcessing ? 'Procesando...' : 'Mint Tokens' }}
          </button>
        </div>
        
        <!-- Transfer Tokens Form -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <input
                v-model="transferAddress"
                type="text"
                class="w-full text-xs rounded-md bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 py-1 px-2"
                placeholder="Dirección destino"
              />
            </div>
            <div class="w-20">
              <input
                v-model="transferAmount"
                type="number"
                min="1"
                :max="tokenBalance"
                class="w-full text-xs rounded-md bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 py-1 px-2"
                placeholder="Cantidad"
              />
            </div>
          </div>
          <button
            @click="transferTokens"
            class="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-3 rounded-md transition-colors w-full"
            :disabled="isProcessing || !isTransferValid"
          >
            {{ isProcessing ? 'Procesando...' : 'Transferir Tokens' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Transaction History -->
    <div>
      <h3 class="text-xs font-semibold mb-2 dark:text-gray-200">Historial de Transacciones</h3>
      <div class="space-y-2 max-h-36 overflow-y-auto pr-1">
        <div
          v-for="(tx, index) in transactionHistory"
          :key="index"
          class="text-xs border-l-2 pl-2 py-1 mb-1 animate-fade-in"
          :class="[
            tx.type === 'mint' ? 'border-green-500' : 'border-blue-500',
            tx.status === 'confirmed' ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
          ]"
        >
          <div class="flex justify-between">
            <div>
              <span
                :class="tx.type === 'mint' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'"
                class="font-medium"
              >
                {{ tx.type === 'mint' ? 'Mint' : 'Transfer' }}
              </span>
              <span> - {{ tx.amount }} DEMO</span>
            </div>
            <span class="font-mono">{{ formatTime(tx.timestamp) }}</span>
          </div>
          <div v-if="tx.type === 'transfer'" class="text-2xs text-gray-500">
            Para: {{ shortenAddress(tx.to) }}
          </div>
          <div v-if="tx.status === 'pending'" class="text-2xs text-amber-600 font-medium flex items-center mt-0.5">
            <span class="w-1.5 h-1.5 inline-block rounded-full bg-amber-500 mr-1 animate-pulse"></span>
            Pendiente...
          </div>
          <div v-else class="text-2xs text-green-600 dark:text-green-400 font-medium flex items-center mt-0.5">
            <span class="w-1.5 h-1.5 inline-block rounded-full bg-green-500 mr-1"></span>
            Confirmado - Bloque #{{ tx.blockNumber }}
          </div>
        </div>
        
        <div v-if="transactionHistory.length === 0" class="text-center text-xs text-gray-500 py-2">
          No hay transacciones
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

// Contract Code - Solidity Basic ERC20
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
    
    // Additional ERC20 functions would be here...
}`;

// Contract State
const contractInfo = reactive({
  name: 'DemoToken',
  symbol: 'DEMO',
  address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', // Demo address
  owner: '0x61AaA1A8c6a3A4962129395ede91c799D5dcB655', // User wallet
});

// User State
const tokenBalance = ref(0);
const mintAmount = ref(10);
const transferAddress = ref('');
const transferAmount = ref(0);
const isProcessing = ref(false);
const isCompiling = ref(false);
const transactionHistory = ref([]);

// Random valid-looking blockchain addresses
const validAddresses = [
  '0xBEC5E1AF5b4bE3cF8A4eE0B1F59371d81642aC8e',
  '0xA8ee341d2D341C2f965Ec62F398707cb0DCf6AB2',
  '0xcB9ef28Fb5562C84CC51E7aCe78641a4C6418129'
];

// Computed prop for transfer validation
const isTransferValid = computed(() => {
  return transferAddress.value && 
         transferAmount.value > 0 && 
         transferAmount.value <= tokenBalance.value;
});

// Helpers
const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(timestamp));
};

const simulateTransaction = (txData, callback) => {
  isProcessing.value = true;
  
  // Add to history as pending
  const tx = {
    ...txData,
    status: 'pending',
    timestamp: Date.now(),
  };
  
  transactionHistory.value.unshift(tx);
  
  // Simulate blockchain delay 1-3 seconds
  setTimeout(() => {
    // "Confirm" transaction
    tx.status = 'confirmed';
    tx.blockNumber = Math.floor(Math.random() * 1000) + 15000000;
    
    // Execute callback with finished tx
    if (callback) callback(tx);
    
    isProcessing.value = false;
  }, Math.random() * 2000 + 1000);
};

// Contract interactions
const mintTokens = () => {
  const amount = parseInt(mintAmount.value);
  if (isNaN(amount) || amount <= 0) return;
  
  simulateTransaction({
    type: 'mint',
    amount: amount,
    from: '0x0000000000000000000000000000000000000000',
    to: contractInfo.owner
  }, () => {
    tokenBalance.value += amount;
  });
};

const transferTokens = () => {
  const amount = parseInt(transferAmount.value);
  const to = transferAddress.value;
  
  if (isNaN(amount) || amount <= 0 || amount > tokenBalance.value || !to) {
    return;
  }
  
  simulateTransaction({
    type: 'transfer',
    amount: amount,
    from: contractInfo.owner,
    to: to
  }, () => {
    tokenBalance.value -= amount;
    transferAmount.value = 0;
    transferAddress.value = '';
  });
};

// Compile contract animation
const compileContract = () => {
  isCompiling.value = true;
  setTimeout(() => {
    isCompiling.value = false;
  }, 2000);
};

// Initialization
onMounted(() => {
  compileContract();
  
  // Set initial balance
  setTimeout(() => {
    tokenBalance.value = 100;
    
    // Add some sample transaction history
    transactionHistory.value = [
      {
        type: 'mint',
        amount: 100,
        from: '0x0000000000000000000000000000000000000000',
        to: contractInfo.owner,
        status: 'confirmed',
        timestamp: Date.now() - 3600000,
        blockNumber: 15276490
      }
    ];
    
    // Suggest a valid address for transfer
    transferAddress.value = validAddresses[Math.floor(Math.random() * validAddresses.length)];
  }, 2500);
});
</script>

<style scoped>
.text-2xs {
  font-size: 0.65rem;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
</style>
