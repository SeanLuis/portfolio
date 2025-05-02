<template>
  <div
    class="glassmorphism-demo p-8 bg-gradient-to-br from-violet-600 to-indigo-700 relative overflow-hidden"
  >
    <!-- Patrón de fondo sutil -->
    <div class="absolute inset-0 background-pattern opacity-15"></div>
    
    <div class="relative z-10 flex flex-wrap gap-5 justify-center">
      <!-- Card 1 - Documentos -->
      <div
        class="glass-card group w-64 p-5 rounded-xl backdrop-blur-lg bg-white/15 border border-white/20 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="icon-wrapper p-2.5 rounded-lg bg-white/15 inline-flex items-center justify-center">
            <Icon name="uil:file-alt" class="w-6 h-6 text-white" />
          </div>
        </div>
        
        <h3 class="text-lg font-medium text-white mb-2">Documentos</h3>
        <p class="text-white/70 text-sm leading-relaxed">
          Gestiona y organiza todos tus documentos de manera segura.
        </p>
        
        <div class="mt-5 pt-4 border-t border-white/10 flex justify-between items-center">
          <div class="flex items-center">
            <Icon name="uil:file" class="w-3.5 h-3.5 text-white/60 mr-1.5" />
            <span class="text-xs text-white/60">6 archivos</span>
          </div>
          <button class="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Icon name="uil:angle-right" class="w-4 h-4 text-white" />
          </button>
        </div>
        
        <!-- Efecto de brillo al pasar el mouse -->
        <div class="card-glow"></div>
      </div>
      
      <!-- Card 2 - Historial -->
      <div
        class="glass-card group w-64 p-5 rounded-xl backdrop-blur-lg bg-white/15 border border-white/20 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="icon-wrapper p-2.5 rounded-lg bg-white/15 inline-flex items-center justify-center">
            <Icon name="uil:history" class="w-6 h-6 text-white" />
          </div>
        </div>
        
        <h3 class="text-lg font-medium text-white mb-2">Historial</h3>
        <p class="text-white/70 text-sm leading-relaxed">
          Accede al historial completo de todas tus transacciones.
        </p>
        
        <div class="mt-5 pt-4 border-t border-white/10 flex justify-between items-center">
          <div class="flex items-center">
            <Icon name="uil:database" class="w-3.5 h-3.5 text-white/60 mr-1.5" />
            <span class="text-xs text-white/60">142 registros</span>
          </div>
          <button class="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Icon name="uil:angle-right" class="w-4 h-4 text-white" />
          </button>
        </div>
        
        <!-- Efecto de brillo al pasar el mouse -->
        <div class="card-glow"></div>
      </div>
      
      <!-- Card 3 - Estadísticas -->
      <div
        class="glass-card group w-64 p-5 rounded-xl backdrop-blur-lg bg-white/15 border border-white/20 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="icon-wrapper p-2.5 rounded-lg bg-white/15 inline-flex items-center justify-center">
            <Icon name="uil:chart-line" class="w-6 h-6 text-white" />
          </div>
        </div>
        
        <h3 class="text-lg font-medium text-white mb-2">Estadísticas</h3>
        <p class="text-white/70 text-sm leading-relaxed">
          Analiza métricas y datos de rendimiento en tiempo real.
        </p>
        
        <div class="mt-5 pt-4 border-t border-white/10 flex justify-between items-center">
          <div class="flex items-center">
            <Icon name="uil:chart-pie" class="w-3.5 h-3.5 text-white/60 mr-1.5" />
            <span class="text-xs text-white/60">14 gráficos</span>
          </div>
          <button class="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Icon name="uil:angle-right" class="w-4 h-4 text-white" />
          </button>
        </div>
        
        <!-- Efecto de brillo al pasar el mouse -->
        <div class="card-glow"></div>
      </div>
    </div>
    
    <!-- Mouse position light effect - Más sutil y elegante -->
    <div 
      ref="lightEffect" 
      class="pointer-events-none absolute h-48 w-48 rounded-full bg-white/20 opacity-0 blur-3xl transition-opacity duration-700"
      style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
    ></div>
    
    <!-- Efecto de partículas que da profundidad -->
    <div class="particles absolute inset-0 z-0"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const lightEffect = ref(null);

const handleMouseMove = (event) => {
  const container = event.currentTarget;
  const rect = container.getBoundingClientRect();
  
  // Calcular posición del ratón relativa al contenedor
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  if (lightEffect.value) {
    // Posicionar el efecto de luz en la posición del ratón con animación suave
    lightEffect.value.style.opacity = '0.7';
    lightEffect.value.style.left = `${x}px`;
    lightEffect.value.style.top = `${y}px`;
    lightEffect.value.style.transform = 'translate(-50%, -50%) scale(1.1)';
  }
  
  // Aplicar efecto de rotación 3D a las tarjetas
  document.querySelectorAll('.glass-card').forEach(card => {
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    // Solo aplicar efecto si el cursor está cerca de la tarjeta
    const distanceX = Math.abs(event.clientX - cardCenterX);
    const distanceY = Math.abs(event.clientY - cardCenterY);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < 200) {
      const rotateY = ((event.clientX - cardCenterX) / 20);
      const rotateX = -((event.clientY - cardCenterY) / 20);
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
  });
};

const handleMouseLeave = () => {
  // Restablecer el efecto de luz y la rotación de las tarjetas
  if (lightEffect.value) {
    lightEffect.value.style.opacity = '0';
    lightEffect.value.style.transform = 'translate(-50%, -50%) scale(0.9)';
  }
  
  // Restablecer la rotación de las tarjetas
  document.querySelectorAll('.glass-card').forEach(card => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
};

// Efecto de interacción al pasar por cada tarjeta
const handleCardHover = (event) => {
  const card = event.currentTarget;
  const cardBounds = card.getBoundingClientRect();
  const cardCenterX = cardBounds.left + cardBounds.width / 2;
  const cardCenterY = cardBounds.top + cardBounds.height / 2;
  
  // Activar glow en la tarjeta
  const glow = card.querySelector('.card-glow');
  if (glow) {
    glow.style.opacity = '1';
  }
};

const handleCardLeave = (event) => {
  const card = event.currentTarget;
  
  // Desactivar glow en la tarjeta
  const glow = card.querySelector('.card-glow');
  if (glow) {
    glow.style.opacity = '0';
  }
};

onMounted(() => {
  const container = document.querySelector('.glassmorphism-demo');
  if (container) {
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Añadir eventos a cada tarjeta
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('mouseenter', handleCardHover);
      card.addEventListener('mouseleave', handleCardLeave);
    });
  }
});

onUnmounted(() => {
  const container = document.querySelector('.glassmorphism-demo');
  if (container) {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
    
    // Eliminar eventos de cada tarjeta
    document.querySelectorAll('.glass-card').forEach(card => {
      card.removeEventListener('mouseenter', handleCardHover);
      card.removeEventListener('mouseleave', handleCardLeave);
    });
  }
});
</script>

<style scoped>
.background-pattern {
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
}

.glassmorphism-demo {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.glass-card {
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.1, 0.7, 0.1, 1);
  box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.3);
}

.glass-card:hover {
  transform: translateY(-6px) scale(1.02);
}

.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.card-glow {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -2;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
}

/* Efecto de partículas */
.particles {
  background-image: 
    radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
    radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px, 30px 30px;
  background-position: 0 0, 10px 10px;
}

/* Animación más sutil para la rotación */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}
</style>
