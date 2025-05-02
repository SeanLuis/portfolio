<template>
  <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-base font-medium text-gray-900 dark:text-gray-100">Loading States</h2>
      <div class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400">
        Tailwind CSS
      </div>
    </div>
    
    <!-- Grid de loaders modernos -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Loader 1: Dots -->
      <div class="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 aspect-square">
        <div class="flex space-x-1 mb-3">
          <div class="w-2 h-2 rounded-full bg-blue-500 animate-dot-bounce"></div>
          <div class="w-2 h-2 rounded-full bg-blue-500 animate-dot-bounce" style="animation-delay: 150ms"></div>
          <div class="w-2 h-2 rounded-full bg-blue-500 animate-dot-bounce" style="animation-delay: 300ms"></div>
        </div>
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Dots</span>
      </div>
      
      <!-- Loader 2: Circular -->
      <div class="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 aspect-square">
        <div class="mb-3 relative">
          <svg class="w-8 h-8 animate-spin text-gray-300 dark:text-gray-600" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path class="opacity-75" fill="currentColor" stroke="none" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="h-2 w-2 rounded-full bg-blue-500"></div>
          </div>
        </div>
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Spinner</span>
      </div>
      
      <!-- Loader 3: Pulse -->
      <div class="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 aspect-square">
        <div class="mb-3 relative h-8 w-8">
          <span class="absolute h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping-slow"></span>
          <span class="relative flex h-3 w-3 rounded-full bg-blue-500" style="margin: 10px"></span>
        </div>
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Pulse</span>
      </div>
      
      <!-- Loader 4: Progress -->
      <div class="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 aspect-square">
        <div class="mb-3 w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div class="h-full bg-blue-500 animate-progress-linear"></div>
        </div>
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Progress</span>
      </div>
      
      <!-- Loader 5: Skeleton Line -->
      <div class="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 aspect-square">
        <div class="mb-3 space-y-2 w-16">
          <div class="h-1.5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div class="h-1.5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 ml-auto"></div>
          <div class="h-1.5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
        </div>
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Skeleton</span>
      </div>
      
      <!-- Loader 6: Ripple -->
      <div class="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 aspect-square">
        <div class="mb-3 relative h-8 w-8">
          <span class="absolute h-full w-full rounded-full border-2 border-blue-500 animate-ripple"></span>
          <span class="absolute h-full w-full rounded-full border-2 border-blue-500 animate-ripple" style="animation-delay: 300ms"></span>
          <span class="relative flex h-2 w-2 rounded-full bg-blue-500 m-3"></span>
        </div>
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Ripple</span>
      </div>
      
      <!-- Loader 7: Bars -->
      <div class="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 aspect-square">
        <div class="mb-3 flex items-end space-x-1 h-8">
          <div class="w-1.5 h-3 bg-blue-500 animate-bar" style="animation-delay: 0ms"></div>
          <div class="w-1.5 h-5 bg-blue-500 animate-bar" style="animation-delay: 100ms"></div>
          <div class="w-1.5 h-7 bg-blue-500 animate-bar" style="animation-delay: 200ms"></div>
          <div class="w-1.5 h-5 bg-blue-500 animate-bar" style="animation-delay: 300ms"></div>
          <div class="w-1.5 h-3 bg-blue-500 animate-bar" style="animation-delay: 400ms"></div>
        </div>
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Bars</span>
      </div>
      
      <!-- Loader 8: Circle Dots -->
      <div class="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 aspect-square">
        <div class="mb-3">
          <div class="circle-loader">
            <div class="circle-dot"></div>
            <div class="circle-dot"></div>
            <div class="circle-dot"></div>
            <div class="circle-dot"></div>
            <div class="circle-dot"></div>
            <div class="circle-dot"></div>
          </div>
        </div>
        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Circle</span>
      </div>
    </div>
    
    <!-- Buttons with Loading States -->
    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
      <!-- Button Group 1 -->
      <div class="flex space-x-2 justify-center">
        <button 
          @click="toggleButton1"
          :class="[
            'flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-all',
            btn1Loading ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-blue-500 text-white hover:bg-blue-600'
          ]"
        >
          <Icon v-if="btn1Loading" name="uil:spinner" class="animate-spin mr-1.5 w-3.5 h-3.5" />
          <span>{{ btn1Loading ? 'Cargando...' : 'Cargar' }}</span>
        </button>
        
        <button 
          @click="toggleButton2"
          :class="[
            'flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium border transition-all',
            btn2Loading ? 'border-gray-300 text-gray-400 dark:border-gray-600' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          ]"
          :disabled="btn2Loading"
        >
          <span class="relative">
            <span v-if="btn2Loading" class="invisible">Procesar</span>
            <span v-else>Procesar</span>
            <span v-if="btn2Loading" class="dots-loader absolute left-0"></span>
          </span>
        </button>
      </div>
      
      <!-- Button Group 2 -->
      <div class="flex space-x-2 justify-center">
        <button 
          @click="toggleButton3"
          class="relative text-xs rounded-md px-3 py-1.5 font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 overflow-hidden transition-all"
        >
          <span :class="{ 'opacity-0': btn3Loading }">Sincronizar</span>
          <span 
            v-if="btn3Loading" 
            class="absolute inset-0 flex items-center justify-center"
          >
            <svg class="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path class="opacity-75" fill="currentColor" stroke="none" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </span>
        </button>
        
        <button 
          @click="toggleButton4" 
          class="rounded-md overflow-hidden px-0 py-0 h-7 text-xs font-medium relative"
        >
          <div class="px-3 py-1.5 bg-green-500 text-white flex items-center justify-center h-full relative">
            <span :class="{ 'opacity-0': btn4Loading }">Completado</span>
            <div v-if="btn4Loading" class="absolute inset-0 bg-green-600">
              <div class="progress-bar h-full bg-green-400/30"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Estados de carga para los botones
const btn1Loading = ref(false);
const btn2Loading = ref(false);
const btn3Loading = ref(false);
const btn4Loading = ref(false);

// Funciones para alternar estados de carga con tiempos diferentes
const toggleButton1 = () => {
  btn1Loading.value = true;
  setTimeout(() => {
    btn1Loading.value = false;
  }, 1500);
};

const toggleButton2 = () => {
  btn2Loading.value = true;
  setTimeout(() => {
    btn2Loading.value = false;
  }, 2000);
};

const toggleButton3 = () => {
  btn3Loading.value = true;
  setTimeout(() => {
    btn3Loading.value = false;
  }, 1800);
};

const toggleButton4 = () => {
  btn4Loading.value = true;
  setTimeout(() => {
    btn4Loading.value = false;
  }, 2500);
};
</script>

<style scoped>
/* Animaciones para los loaders */
@keyframes dot-bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

.animate-dot-bounce {
  animation: dot-bounce 1.2s infinite ease-in-out;
}

@keyframes ping-slow {
  0% { transform: scale(1); opacity: 0.8; }
  80%, 100% { transform: scale(2.2); opacity: 0; }
}

.animate-ping-slow {
  animation: ping-slow 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes progress-linear {
  0% { width: 0%; margin-left: 0; }
  50% { width: 100%; margin-left: 0; }
  100% { width: 0%; margin-left: 100%; }
}

.animate-progress-linear {
  animation: progress-linear 2.2s ease-in-out infinite;
}

@keyframes ripple {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

.animate-ripple {
  animation: ripple 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes bar {
  0%, 100% { transform: scaleY(0.8); }
  50% { transform: scaleY(1.2); }
}

.animate-bar {
  animation: bar 1s ease-in-out infinite;
}

/* Circle Dots Loader */
.circle-loader {
  position: relative;
  width: 24px;
  height: 24px;
}

.circle-dot {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: rgb(59, 130, 246); /* blue-500 */
  animation: circle-rotate 1.2s linear infinite;
}

.circle-dot:nth-child(1) { left: 0; top: 50%; margin-top: -1.5px; animation-delay: 0s; }
.circle-dot:nth-child(2) { left: 25%; top: 18%; animation-delay: -0.1s; }
.circle-dot:nth-child(3) { left: 50%; top: 0; margin-left: -1.5px; animation-delay: -0.2s; }
.circle-dot:nth-child(4) { right: 25%; top: 18%; animation-delay: -0.3s; }
.circle-dot:nth-child(5) { right: 0; top: 50%; margin-top: -1.5px; animation-delay: -0.4s; }
.circle-dot:nth-child(6) { right: 12.5%; bottom: 18%; animation-delay: -0.5s; }

@keyframes circle-rotate {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

/* Progress Button */
.progress-bar {
  position: relative;
  width: 0%;
  animation: progress-animation 2.5s linear forwards;
}

.progress-button {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.progress-button::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 0;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.3);
  animation: progress-animation 2.5s linear;
}

@keyframes progress-animation {
  0% { width: 0%; }
  100% { width: 100%; }
}

/* Dots Loader para botón */
.dots-loader::after {
  content: '...';
  animation: dots 1.5s infinite;
  position: relative;
  display: inline-block;
}

@keyframes dots {
  0% { content: '.'; }
  33% { content: '..'; }
  66% { content: '...'; }
}
</style>
