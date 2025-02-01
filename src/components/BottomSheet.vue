<template>
  <div class="bottom-sheet-wrapper" v-if="isVisible" @click="close">
    <div 
      class="bottom-sheet"
      :class="{ expanded }"
      @click.stop
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div class="handle"></div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isVisible: boolean
}>();

const emit = defineEmits(['update:isVisible']);

const expanded = ref(false);
let startY = 0;
let startHeight = 0;

const close = () => {
  emit('update:isVisible', false);
};

const handleTouchStart = (e: TouchEvent) => {
  startY = e.touches[0].clientY;
  startHeight = e.target.getBoundingClientRect().height;
};

const handleTouchMove = (e: TouchEvent) => {
  const deltaY = e.touches[0].clientY - startY;
  if (deltaY > 0) {
    e.preventDefault();
    expanded.value = false;
  } else {
    expanded.value = true;
  }
};

const handleTouchEnd = (e: TouchEvent) => {
  const deltaY = e.changedTouches[0].clientY - startY;
  if (deltaY > 100) {
    close();
  }
};
</script>

<style scoped>
.bottom-sheet-wrapper {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--surface-dark);
  border-radius: 20px 20px 0 0;
  padding: 20px;
  transform: translateY(0);
  transition: transform 0.3s ease;
  max-height: 90vh;
  overflow-y: auto;
}

.handle {
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin: 0 auto 20px;
}

.expanded {
  transform: translateY(0);
}
</style> 