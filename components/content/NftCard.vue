<template>
  <div class="p-8 bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center">
    <div
      class="nft-card"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
      ref="card"
    >
      <!-- NFT Image -->
      <div class="relative mb-3 overflow-hidden rounded-xl">
        <img
          :src="nftData.imageUrl"
          alt="NFT Artwork"
          class="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"
        ></div>
        <div
          class="absolute top-3 left-3 bg-black/20 backdrop-blur-md px-2 py-1 rounded-full flex items-center"
        >
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
          <span class="text-xs text-white font-medium">Live Auction</span>
        </div>
      </div>

      <!-- NFT Info -->
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
            {{ nftData.name }}
          </h3>
          <div class="flex items-center">
            <svg class="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-xs text-gray-500 dark:text-gray-400">Verificado</span>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img
              :src="nftData.creatorAvatar"
              alt="Creator"
              class="w-5 h-5 rounded-full mr-2 border border-white"
            />
            <span class="text-xs text-gray-600 dark:text-gray-400">
              @{{ nftData.creator }}
            </span>
          </div>
          <div class="flex items-center">
            <img
              src="https://img.icons8.com/?size=100&id=50284&format=png&color=000000"
              alt="ETH"
              class="w-3 h-3 mr-1"
            />
            <span class="text-xs font-semibold text-gray-900 dark:text-white">
              {{ nftData.price }} ETH
            </span>
          </div>
        </div>

        <!-- Time Counter -->
        <div class="pt-3 border-t border-gray-200 dark:border-gray-800">
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-500 dark:text-gray-400">Termina en</span>
            <div class="flex space-x-2 text-xs font-medium">
              <div class="flex flex-col items-center">
                <span class="text-gray-900 dark:text-white">{{ countdown.hours }}</span>
                <span class="text-gray-500 dark:text-gray-400 text-2xs">Horas</span>
              </div>
              <div class="text-gray-400">:</div>
              <div class="flex flex-col items-center">
                <span class="text-gray-900 dark:text-white">{{ countdown.minutes }}</span>
                <span class="text-gray-500 dark:text-gray-400 text-2xs">Min</span>
              </div>
              <div class="text-gray-400">:</div>
              <div class="flex flex-col items-center">
                <span class="text-gray-900 dark:text-white">{{ countdown.seconds }}</span>
                <span class="text-gray-500 dark:text-gray-400 text-2xs">Seg</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bid Button -->
        <button
          class="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg flex items-center justify-center space-x-1"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>Ofertar ahora</span>
        </button>
      </div>

      <!-- 3D Card Effect Elements -->
      <div class="card-shine"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// NFT Data
const nftData = {
  name: "CryptoAbstract #4721",
  creator: "artblocks",
  price: 1.25,
  imageUrl: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
  creatorAvatar: "https://randomuser.me/api/portraits/women/44.jpg"
};

// Card 3D effects
const card = ref(null);
const rotateCard = (e) => {
  if (!card.value) return;
  const rect = card.value.getBoundingClientRect();
  
  // Get mouse position relative to card
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Calculate rotation based on mouse position
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateY = ((x - centerX) / centerX) * 5; // Max 5 degrees
  const rotateX = ((centerY - y) / centerY) * 5; // Max 5 degrees
  
  // Apply transform
  card.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  
  // Update shine effect
  const shine = card.value.querySelector('.card-shine');
  if (shine) {
    shine.style.backgroundImage = `radial-gradient(
      circle at ${x}px ${y}px,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 50%
    )`;
  }
};

const resetCard = () => {
  if (!card.value) return;
  // Reset transform
  card.value.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  
  // Reset shine effect
  const shine = card.value.querySelector('.card-shine');
  if (shine) {
    shine.style.backgroundImage = 'none';
  }
};

// Countdown timer
const countdown = ref({
  hours: '05',
  minutes: '42',
  seconds: '29'
});

let countdownInterval;
const updateCountdown = () => {
  let hours = parseInt(countdown.value.hours);
  let minutes = parseInt(countdown.value.minutes);
  let seconds = parseInt(countdown.value.seconds);
  
  seconds--;
  
  if (seconds < 0) {
    seconds = 59;
    minutes--;
    
    if (minutes < 0) {
      minutes = 59;
      hours--;
      
      if (hours < 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;
        clearInterval(countdownInterval);
      }
    }
  }
  
  countdown.value = {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  };
};

// Mouse events
const handleMouseMove = (e) => {
  rotateCard(e);
};

const handleMouseLeave = () => {
  resetCard();
};

onMounted(() => {
  countdownInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(countdownInterval);
});
</script>

<style scoped>
.nft-card {
  width: 280px;
  background: #ffffff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 12px;
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  transform-style: preserve-3d;
  will-change: transform;
  cursor: pointer;
  overflow: hidden;
}

.dark .nft-card {
  background: #1f2937;
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.2),
    0 4px 6px -2px rgba(0, 0, 0, 0.1);
}

.nft-card .card-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: none;
  pointer-events: none;
  z-index: 10;
  transition: background-image 0.3s ease;
}

.text-2xs {
  font-size: 0.65rem;
}
</style>
