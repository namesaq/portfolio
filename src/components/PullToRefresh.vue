<template>
  <div 
    class="pull-to-refresh"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="pull-indicator" :style="{ transform: `translateY(${pullDistance}px)` }">
      <i class="fas fa-sync-alt" :class="{ spinning: isRefreshing }"></i>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const pullDistance = ref(0);
const isRefreshing = ref(false);
const startY = ref(0);
const threshold = 80;

const emit = defineEmits(['refresh']);

const handleTouchStart = (e: TouchEvent) => {
  if (window.scrollY === 0) {
    startY.value = e.touches[0].clientY;
  }
};

const handleTouchMove = (e: TouchEvent) => {
  if (startY.value > 0 && !isRefreshing.value) {
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.value;
    if (diff > 0) {
      pullDistance.value = Math.min(diff * 0.5, threshold);
      e.preventDefault();
    }
  }
};

const handleTouchEnd = async () => {
  if (pullDistance.value >= threshold) {
    isRefreshing.value = true;
    emit('refresh');
    setTimeout(() => {
      isRefreshing.value = false;
      pullDistance.value = 0;
    }, 1500);
  } else {
    pullDistance.value = 0;
  }
  startY.value = 0;
};
</script>

<style scoped>
.pull-to-refresh {
  position: relative;
  overflow: hidden;
}

.pull-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style> 