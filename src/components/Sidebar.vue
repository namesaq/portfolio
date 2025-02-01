<template>
  <div class="sidebar">
    <!-- Навигационные элементы -->
     
    <nav class="nav-menu">
      <router-link to="/" class="nav-item" :class="{ active: currentRoute === '/' }">
        <i class="fas fa-home"></i>
        <span class="nav-tooltip">{{ isEnglish ? 'Home' : 'Главная' }}</span>
      </router-link>

      <router-link to="/about" class="nav-item" :class="{ active: currentRoute === '/about' }">
        <i class="fas fa-user"></i>
        <span class="nav-tooltip">{{ isEnglish ? 'About' : 'Обо мне' }}</span>
      </router-link>

      <router-link to="/portfolio" class="nav-item" :class="{ active: currentRoute === '/portfolio' }">
        <i class="fas fa-briefcase"></i>
        <span class="nav-tooltip">{{ isEnglish ? 'Portfolio' : 'Портфолио' }}</span>
      </router-link>

      <router-link to="/contact" class="nav-item" :class="{ active: currentRoute === '/contact' }">
        <i class="fas fa-envelope"></i>
        <span class="nav-tooltip">{{ isEnglish ? 'Contact' : 'Контакты' }}</span>
      </router-link>
    </nav>

    <!-- Капибара -->
    <div class="capybara-wrapper">
      <div class="capybara-container" v-show="showCapybara">
        <div class="capybara">
          <div class="capybara-body"></div>
          <div class="capybara-head">
            <div class="capybara-ear"></div>
            <div class="capybara-eye"></div>
            <div class="capybara-nose"></div>
          </div>
          <div class="capybara-legs">
            <div class="leg front-left"></div>
            <div class="leg front-right"></div>
            <div class="leg back-left"></div>
            <div class="leg back-right"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Переключатель языка -->
    <button class="language-switch" @click="toggleLanguage">
      {{ isEnglish ? 'RU' : 'EN' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentRoute = ref(route.path);
const showCapybara = ref(true);

// Следим за изменением маршрута
watch(
  () => route.path,
  (newPath) => {
    currentRoute.value = newPath;
  }
);

const props = defineProps<{
  isEnglish: boolean
}>();

const emit = defineEmits(['toggle-language']);

const toggleLanguage = () => {
  emit('toggle-language');
};

onMounted(() => {
  // Убедимся, что капибара отображается после монтирования компонента
  showCapybara.value = true;
});
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 90px;
  background: rgba(147, 51, 234, 0.05);
  border-right: 1px solid rgba(147, 51, 234, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  z-index: 100;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.capybara-wrapper {
  position: relative;
  width: 100%;
  height: 90px;
  margin-top: auto;
  margin-bottom: 60px;
  border: 1px solid red; /* для отладки */
}

.capybara-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border: 1px solid blue; /* для отладки */
}

.capybara {
  width: 70px;
  height: 55px;
  position: relative;
  animation: waddle 4s ease-in-out infinite;
  border: 1px solid green; /* для отладки */
}

.capybara-body {
  position: absolute;
  width: 55px;
  height: 40px;
  background: #9333EA;
  border: 2px solid rgba(147, 51, 234, 0.8);
  border-radius: 25px 30px 20px 15px;
  bottom: 5px;
  right: 5px;
  transform: rotate(-2deg);
  transform-origin: bottom center;
  animation: bodyWobble 4s ease-in-out infinite;
}

.capybara-head {
  position: absolute;
  width: 35px;
  height: 30px;
  background: #9333EA;
  border: 2px solid rgba(147, 51, 234, 0.8);
  border-radius: 15px 18px 12px 10px;
  right: 45px;
  bottom: 15px;
  animation: headBob 4s ease-in-out infinite;
}

.capybara-ear {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #9333EA;
  border: 2px solid rgba(147, 51, 234, 0.8);
  border-radius: 50%;
  right: 6px;
  top: -2px;
}

.capybara-eye {
  position: absolute;
  width: 6px;
  height: 4px;
  background: #FFFFFF;
  border-radius: 50%;
  left: 12px;
  top: 8px;
  animation: blink 4s ease-in-out infinite;
}

.capybara-nose {
  position: absolute;
  width: 10px;
  height: 8px;
  background: #7C3AED;
  border-radius: 8px 6px 6px 6px;
  left: 4px;
  top: 12px;
}

.capybara-legs .leg {
  position: absolute;
  width: 6px;
  height: 10px;
  background: #9333EA;
  border: 2px solid rgba(147, 51, 234, 0.8);
  border-radius: 3px;
}

.leg.front-left {
  left: 18px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite;
}

.leg.front-right {
  left: 28px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite 0.5s;
}

.leg.back-left {
  right: 28px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite 1s;
}

.leg.back-right {
  right: 18px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite 1.5s;
}

@keyframes waddle {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-2px) rotate(1deg); }
  75% { transform: translateY(2px) rotate(-1deg); }
}

@keyframes bodyWobble {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(-1deg); }
}

@keyframes headBob {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(2deg) translateY(-1px); }
  75% { transform: rotate(-2deg) translateY(1px); }
}

@keyframes blink {
  0%, 45%, 55%, 100% { transform: scaleY(1); opacity: 0.8; }
  50% { transform: scaleY(0.1); opacity: 0.6; }
}

@keyframes legMove {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-2px) rotate(3deg); }
  75% { transform: translateY(0) rotate(-3deg); }
}

.nav-item {
  width: 60px;
  height: 60px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  background: rgba(147, 51, 234, 0.03);
  border: 1px solid rgba(147, 51, 234, 0.1);
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(147, 51, 234, 0.2),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  left: -50%;
  top: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(147, 51, 234, 0.3),
    transparent 60%
  );
  animation: rotate 4s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-item:hover {
  color: #9333EA;
  background: rgba(147, 51, 234, 0.1);
  border-color: rgba(147, 51, 234, 0.3);
  transform: translateX(10px) scale(1.05);
  box-shadow: 
    -5px 0 20px rgba(147, 51, 234, 0.2),
    0 0 10px rgba(147, 51, 234, 0.1),
    inset 0 0 15px rgba(147, 51, 234, 0.1);
}

.nav-item:hover::before,
.nav-item:hover::after {
  opacity: 1;
}

.nav-item.active {
  color: #9333EA;
  background: rgba(147, 51, 234, 0.15);
  border-color: rgba(147, 51, 234, 0.4);
  transform: translateX(10px);
  box-shadow: 
    -8px 0 25px rgba(147, 51, 234, 0.3),
    0 0 15px rgba(147, 51, 234, 0.2),
    inset 0 0 20px rgba(147, 51, 234, 0.15);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.nav-item i {
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.nav-item:hover i, .nav-item.active i {
  transform: scale(1.1);
}

.nav-tooltip {
  position: absolute;
  left: 70px;
  padding: 8px 12px;
  background: rgba(147, 51, 234, 0.9);
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-tooltip::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-style: solid;
  border-width: 6px 6px 6px 0;
  border-color: transparent rgba(147, 51, 234, 0.9) transparent transparent;
}

.nav-item:hover .nav-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.language-switch {
  margin-top: auto;
  padding: 10px;
  border-radius: 12px;
  background: rgba(147, 51, 234, 0.05);
  border: 1px solid rgba(147, 51, 234, 0.1);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-switch:hover {
  background: rgba(147, 51, 234, 0.1);
  border-color: rgba(147, 51, 234, 0.2);
  transform: translateY(-2px);
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  width: 100%;
  min-width: 160px;
  height: 48px;
}

.nav-link.active {
  background: var(--bg-secondary);
  color: var(--accent-primary);
  border: 1px solid var(--border-color);
}

.nav-link:hover {
  background: var(--hover-bg);
  transform: translateX(5px);
}

.nav-link i {
  margin-right: 1rem;
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}
</style> 