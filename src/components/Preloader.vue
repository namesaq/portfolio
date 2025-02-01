<template>
  <div class="preloader" v-if="isLoading">
    <div class="spinner">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isLoading: boolean
}>();
</script>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.spinner {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  background: var(--accent-primary);
  border-radius: 50%;
  animation: bounce 0.5s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.1s; }
.dot:nth-child(3) { animation-delay: 0.2s; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style> 