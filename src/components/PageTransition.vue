<template>
  <transition
    :name="isMobile ? 'mobile-transition' : 'page'"
    mode="out-in"
    @before-leave="beforeLeave"
    @enter="enter"
    @after-enter="afterEnter"
  >
    <slot />
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isMobile = ref(window.innerWidth <= 768);

onMounted(() => {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768;
  });
});

const beforeLeave = (el: Element) => {
  (el as HTMLElement).style.height = window.getComputedStyle(el).height;
};

const enter = (el: Element) => {
  (el as HTMLElement).style.height = 'auto';
  const height = window.getComputedStyle(el).height;
  (el as HTMLElement).style.height = '0';
  el.scrollTop;
  (el as HTMLElement).style.height = height;
};

const afterEnter = (el: Element) => {
  (el as HTMLElement).style.height = 'auto';
};
</script>

<style scoped>
/* Мобильная анимация */
.mobile-transition-enter-active,
.mobile-transition-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.mobile-transition-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.mobile-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Десктопная анимация */
.page-enter-active,
.page-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style> 