<template>
  <div class="overflow-hidden bg-white dark:bg-gray-900">
    <!-- Header con búsqueda integrada (estilo GitHub) -->
    <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-3 sm:items-center">
      <div class="flex items-center">
        <Icon name="uil:cube" class="w-4 h-4 text-blue-500 mr-2" />
        <h2 class="text-sm font-medium text-gray-700 dark:text-gray-200">Blockchain Explorer</h2>
      </div>
      
      <!-- Barra de búsqueda integrada (estilo GitHub) -->
      <div class="relative flex-1">
        <div class="flex absolute inset-y-0 left-0 items-center pl-2.5 pointer-events-none">
          <Icon name="uil:search" class="w-3.5 h-3.5 text-gray-400" />
        </div>
        <input 
          type="search" 
          class="block w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 focus:ring-1 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
          placeholder="Buscar dirección, hash o bloque..." 
          v-model="searchQuery"
        />
      </div>
      
      <!-- Pestañas de navegación (compactas) -->
      <div class="flex text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-3 py-1 flex items-center transition-colors"
          :class="activeTab === tab.id 
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'"
        >
          <Icon 
            :name="tab.id === 'blocks' ? 'uil:cube' : 'uil:transaction'" 
            class="w-3.5 h-3.5 mr-1.5"
          />
          {{ tab.name }}
        </button>
      </div>
    </div>
    
    <!-- Stats Cards (estilo Stripe) -->
    <div class="grid grid-cols-4 text-xs divide-x divide-gray-200 dark:divide-gray-800 border-b border-gray-200 dark:border-gray-800">
      <div class="p-3 flex flex-col justify-center">
        <div class="flex justify-between items-baseline mb-1">
          <span class="text-gray-500 dark:text-gray-400 text-2xs">Precio ETH</span>
          <span 
            :class="stats.priceChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
            class="text-2xs"
          >
            {{ stats.priceChange >= 0 ? '↑' : '↓' }} {{ Math.abs(stats.priceChange) }}%
          </span>
        </div>
        <span class="font-medium text-gray-900 dark:text-white">${{ stats.ethPrice }}</span>
      </div>
      
      <div class="p-3 flex flex-col justify-center">
        <span class="text-gray-500 dark:text-gray-400 text-2xs mb-1">Gas (Gwei)</span>
        <div class="flex items-baseline">
          <span class="font-medium text-gray-900 dark:text-white">{{ stats.gasPrice }}</span>
          <span class="ml-1 text-2xs text-gray-500 dark:text-gray-400">
            (${{ stats.gasPriceUSD }})
          </span>
        </div>
      </div>
      
      <div class="p-3 flex flex-col justify-center">
        <span class="text-gray-500 dark:text-gray-400 text-2xs mb-1">Último Bloque</span>
        <span class="font-medium text-gray-900 dark:text-white">#{{ stats.latestBlock }}</span>
      </div>
      
      <div class="p-3 flex flex-col justify-center">
        <span class="text-gray-500 dark:text-gray-400 text-2xs mb-1">TPS</span>
        <div class="flex items-center">
          <span class="font-medium text-gray-900 dark:text-white">{{ stats.tps }}</span>
          <div class="ml-1.5 flex items-center h-1.5 w-16 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div class="h-full bg-blue-500 dark:bg-blue-600" style="width: 65%"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div v-if="activeTab === 'blocks'" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b dark:border-gray-700">
        <h3 class="text-sm font-medium text-gray-900 dark:text-white">Bloques recientes</h3>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Bloque
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Minado
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Txns
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Gas utilizado
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Recompensa
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="block in blocks" :key="block.number" class="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td class="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                {{ block.number }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {{ block.time }} 
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {{ block.transactions }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {{ block.gasUsed }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {{ block.reward }} ETH
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="p-4 border-t dark:border-gray-700 flex justify-center">
        <button class="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors">
          Cargar más
        </button>
      </div>
    </div>
    
    <div v-if="activeTab === 'txs'" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b dark:border-gray-700">
        <h3 class="text-sm font-medium text-gray-900 dark:text-white">Transacciones recientes</h3>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Hash
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Bloque
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                De
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                A
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Valor
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="tx in transactions" :key="tx.hash" class="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td class="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                <div class="flex items-center">
                  <span class="truncate w-20">{{ tx.hash }}</span>
                  <svg class="w-3.5 h-3.5 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {{ tx.block }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center">
                  <span class="truncate w-20">{{ tx.from }}</span>
                  <svg class="w-3.5 h-3.5 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center">
                  <span class="truncate w-20">{{ tx.to }}</span>
                  <svg class="w-3.5 h-3.5 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {{ tx.value }} ETH
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="p-4 border-t dark:border-gray-700 flex justify-center">
        <button class="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors">
          Cargar más
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Tabs con iconos
const tabs = [
  { id: 'blocks', name: 'Bloques' },
  { id: 'txs', name: 'Transacciones' }
];
const activeTab = ref('blocks');
const searchQuery = ref('');

// Stats en formato compacto
const stats = reactive({
  ethPrice: '1,896.42',
  priceChange: 0.85,
  gasPrice: '12',
  gasPriceUSD: '0.28',
  latestBlock: '18235421',
  tps: '12.4'
});

// Mock Data - Bloques con etiquetas de datos
const blocks = [
  { 
    number: '18235421', 
    time: '10s atrás', 
    transactions: 156, 
    gasUsed: '14.28M', 
    reward: '0.052' 
  },
  { 
    number: '18235420', 
    time: '23s atrás', 
    transactions: 132, 
    gasUsed: '12.45M', 
    reward: '0.043' 
  },
  { 
    number: '18235419', 
    time: '36s atrás', 
    transactions: 189, 
    gasUsed: '15.42M', 
    reward: '0.061' 
  },
  { 
    number: '18235418', 
    time: '48s atrás', 
    transactions: 112, 
    gasUsed: '10.14M', 
    reward: '0.039' 
  },
  { 
    number: '18235417', 
    time: '1m atrás', 
    transactions: 165, 
    gasUsed: '13.78M', 
    reward: '0.056' 
  },
];

// Mock Data - Transacciones con datos formateados para mejor visualización
const transactions = [
  {
    hash: '0x7be8408d1b3817ff5ef7f27a11b72aab0ab7c56683e892042c23435fb233b5b3',
    block: '18235421',
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    value: '0.542'
  },
  {
    hash: '0x6ea46622e3f84c756e55c535998912d19a7f5aa4105542c5a66a2a0f715f7bc9',
    block: '18235421',
    from: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    to: '0x8c65e992297d5f092a756def24f4781a280198ff',
    value: '1.204'
  },
  {
    hash: '0x2e382abe532b5675565672c0f762025925e50764b5262c3a6a9273e267eedb6a',
    block: '18235420',
    from: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    to: '0x269616D549D7e8Eaa82DFb17028d0B212d11232A',
    value: '0.052'
  },
  {
    hash: '0x8d39e0c0e4557f7a30d4108d00287c521c4c5f7a6967dc8792d31c7c56d9c5c9',
    block: '18235420',
    from: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    to: '0xd5281BB2d4b2C92347Ba3Dff51A7B7f4224Df2AE',
    value: '2.350'
  },
  {
    hash: '0x3a1e0d949c75817c6f1f5c28a3d778fc0320783d3f8defbbc15314037c9c308d',
    block: '18235419',
    from: '0xD25bdE28610AeC0B1E01D0FF6149F6484D90abfA',
    to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    value: '0.178'
  },
];
</script>

<style scoped>
/* Tamaños de texto adicionales para mayor compacidad */
.text-2xs {
  font-size: 0.65rem;
  line-height: 0.9rem;
}

/* Estilos específicos para la tabla compacta */
table {
  border-collapse: separate;
  border-spacing: 0;
}

/* Transición suave para elementos interactivos */
button {
  transition: all 0.15s ease;
}

/* Hover más sutiles */
.hover\:bg-gray-50\/50:hover {
  background-color: rgba(249, 250, 251, 0.5);
}
</style>
