<template>
  <main class="container" :data-theme="isDark ? 'dark' : 'light'">
    <!-- Левая панель -->
    <nav class="sidebar" :data-theme="isDark ? 'dark' : 'light'">
      <div class="nav-buttons">
        <button 
          v-for="(item, index) in menuItems" 
          :key="index"
          :class="{ active: activeTab === item.id }" 
          @click="handleNavClick(item.id)"
          class="nav-button"
        >
          <i :class="item.icon"></i>
          <span>{{ isEnglish ? item.en : item.ru }}</span>
        </button>
      </div>

      <!-- Капибара -->
      <div class="capybara-wrapper">
        <div class="water"></div>
        <div class="capybara-container">
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
      
      <button 
        class="theme-toggle" 
        @click="toggleTheme"
        :title="isDark ? (isEnglish ? 'Switch to Light Mode' : 'Переключить на светлую тему') : (isEnglish ? 'Switch to Dark Mode' : 'Переключить на темную тему')"
      >
        <i class="fas" :class="isDark ? 'fa-sun' : 'fa-moon'"></i>
      </button>
    </nav>

    <!-- Правая часть -->
    <section class="content">
      <!-- Переключатель языка -->
      <div class="language-switcher">
        <button @click="changeLanguage(false)" :class="{ active: !isEnglish }">RU</button>
        <button @click="changeLanguage(true)" :class="{ active: isEnglish }">EN</button>
      </div>

      <PageTransition>
        <About v-if="activeTab === 1" :isEnglish="isEnglish" />
        <Portfolio v-if="activeTab === 2" :isEnglish="isEnglish" />
        <Contact v-if="activeTab === 3" :isEnglish="isEnglish" />
      </PageTransition>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import About from '@/components/About.vue';
import Portfolio from '@/components/Portfolio.vue';
import Contact from '@/components/Contact.vue';
import PageTransition from '@/components/PageTransition.vue';
import { useHapticFeedback } from '@/composables/useHapticFeedback';

const activeTab = ref(1);
const isEnglish = ref(false);
const isDark = ref(true);

const { lightTap } = useHapticFeedback();

const handleNavClick = (id: number) => {
  lightTap();
  activeTab.value = id;
};

const changeLanguage = (value: boolean) => {
  isEnglish.value = value;
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
};

const menuItems = [
  { id: 1, icon: 'fa-solid fa-user', en: 'About', ru: 'Обо мне' },
  { id: 2, icon: 'fa-solid fa-briefcase', en: 'Portfolio', ru: 'Портфолио' },
  { id: 3, icon: 'fa-solid fa-envelope', en: 'Contacts', ru: 'Контакты' }
];

// Добавляем активную анимацию для кнопок
const handleButtonClick = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement;
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = '';
  }, 100);
};
</script>

<style scoped>
/* Базовые стили для ПК */
.container {
  display: flex;
  min-height: 100vh;
  background: var(--bg-primary);
  transition: background-color 0.3s ease;
}

/* Левая панель */
.sidebar {
  width: 240px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: var(--bg-primary);
  z-index: 100;
  transition: background-color 0.3s ease;
}

/* Добавляем контейнер для кнопок навигации */
.nav-buttons {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Добавляем стили для кнопки темы */
.theme-toggle {
  width: 40px;
  height: 40px;
  padding: 0;
  background: var(--bg-secondary);
  border: none;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: auto;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.theme-toggle i {
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  color: var(--text-primary);
  background: var(--hover-bg);
  transform: scale(1.05);
}

.theme-toggle:hover i {
  color: var(--accent-primary);
}

.sidebar button {
  background: transparent;
  border: none;
  padding: 1rem 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 12px;
}

.sidebar button i {
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.sidebar button:hover {
  color: var(--text-primary);
  padding-left: 2.2rem;
  background: var(--bg-secondary);
}

.sidebar button.active {
  color: var(--text-primary);
  padding-left: 2.2rem;
  background: var(--bg-secondary);
}

.sidebar button:hover i,
.sidebar button.active i {
  color: var(--accent-primary);
}

.sidebar button::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 0;
  background: var(--accent-primary);
  transition: height 0.3s ease;
  opacity: 0.8;
}

.sidebar button:hover::before {
  height: 60%;
}

.sidebar button.active::before {
  height: 80%;
}

/* Правая часть */
.content {
  flex: 1;
  position: relative;
  margin-left: 240px;
  padding: 2rem;
  background: var(--bg-primary);
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

.content > * {
  animation: pageEnter 0.4s ease-out forwards;
}

@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Переключатель языка */
.language-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 2px;
  background: var(--bg-secondary);
  padding: 4px;
  border-radius: 12px;
  z-index: 1001;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
}

.language-switcher button {
  background: transparent;
  border: none;
  padding: 8px 16px;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.language-switcher button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, 
    var(--bg-primary) 0%, 
    var(--bg-secondary) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.language-switcher button.active {
  color: var(--text-primary);
  background: var(--bg-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.language-switcher button:hover:not(.active) {
  color: var(--text-primary);
  background: var(--bg-primary);
  opacity: 0.8;
}

.content {
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  background: var(--bg-primary);
  transition: all 0.3s ease;
  position: relative;
  overflow-x: hidden;
}

.nav-button {
  background: transparent;
  border: none;
  padding: 10px;
  cursor: pointer;
  color: var(--text-primary);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button.active {
  color: var(--accent-primary);
}

.nav-button:hover {
  color: var(--accent-primary);
}

/* Мобильные стили */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding-bottom: var(--bottom-nav-height);
  }

  .content {
    border-left: none;
    margin-left: 0;
    padding: 1rem;
    padding-bottom: calc(var(--bottom-nav-height) + 1rem);
  }

  .content > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .language-switcher {
    top: calc(env(safe-area-inset-top) + 10px);
    right: 10px;
    background: rgba(147, 51, 234, 0.08);
  }

  .sidebar {
    width: 100%;
    height: var(--bottom-nav-height);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(26, 26, 26, 0.98);
    backdrop-filter: blur(10px);
    z-index: 1000;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 0;
    margin: 0;
  }

  .nav-button {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--white-muted);
    padding: 8px 0;
    margin: 0;
    gap: 4px;
  }

  .nav-button i {
    width: auto;
    margin: 0;
    font-size: 1.4rem;
  }

  .nav-button span {
    font-size: 0.85rem;
  }

  .nav-button.active {
    color: var(--accent-primary);
  }

  .social-links {
    display: none !important;
  }

  .content {
    padding-top: calc(env(safe-area-inset-top) + 60px);
  }
}

/* Социальные сети */
.social-links {
  margin-top: auto;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.social-links:hover {
  opacity: 1;
}

.social-links a {
  color: var(--white-muted);
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-links a:hover {
  color: var(--accent-primary);
  transform: translateY(-2px);
}

.nav {
  position: fixed;
  top: 100px;
  left: 30px;
  width: 300px;
  background: var(--surface-dark);
  border-radius: 16px;
  padding: 1.5rem;
  z-index: 100;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 768px) {
  .nav {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
  }
}

/* Общие стили для основных div-ов */
.about, .portfolio, .contact {
  min-height: 100vh;
  background: var(--bg-primary);
  transition: all 0.3s ease;
}

/* Общие стили для section */
.section {
  background: var(--bg-primary);
  transition: all 0.3s ease;
}

.home {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.capybara-wrapper {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
}

.capybara-container {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scaleX(-1);
}

.water {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 12px;
  background: rgba(147, 51, 234, 0.15);
  border-radius: 50%;
  animation: waterRipple 3s ease-in-out infinite;
}

.water::before {
  content: '';
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%) scaleY(0.3);
  width: 70px;
  height: 8px;
  background: rgba(147, 51, 234, 0.2);
  border-radius: 50%;
  animation: waterReflection 3s ease-in-out infinite;
}

.capybara {
  width: 80px;
  height: 60px;
  position: relative;
  animation: float 4s ease-in-out infinite;
}

.capybara-body {
  position: absolute;
  width: 60px;
  height: 40px;
  background: rgba(147, 51, 234, 0.15);
  border: 1px solid rgba(147, 51, 234, 0.3);
  border-radius: 20px 25px 15px 10px;
  bottom: 5px;
  right: 5px;
  transform: rotate(-2deg);
  transform-origin: bottom center;
  animation: bodyFloat 4s ease-in-out infinite;
}

.capybara-head {
  position: absolute;
  width: 40px;
  height: 32px;
  background: rgba(147, 51, 234, 0.15);
  border: 1px solid rgba(147, 51, 234, 0.3);
  border-radius: 12px 15px 10px 8px;
  right: 55px;
  bottom: 15px;
  animation: headFloat 4s ease-in-out infinite;
}

.capybara-ear {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(147, 51, 234, 0.15);
  border: 1px solid rgba(147, 51, 234, 0.3);
  border-radius: 50%;
  right: 5px;
  top: -2px;
}

.capybara-eye {
  position: absolute;
  width: 5px;
  height: 3px;
  background: rgba(147, 51, 234, 0.4);
  border-radius: 50%;
  left: 15px;
  top: 10px;
  animation: blink 4s ease-in-out infinite;
}

.capybara-nose {
  position: absolute;
  width: 10px;
  height: 7px;
  background: rgba(147, 51, 234, 0.3);
  border-radius: 6px 5px 5px 5px;
  left: 1px;
  top: 15px;
}

.capybara-legs .leg {
  position: absolute;
  width: 6px;
  height: 10px;
  background: rgba(147, 51, 234, 0.15);
  border: 1px solid rgba(147, 51, 234, 0.3);
  border-radius: 3px;
}

.leg.front-left {
  left: 20px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite;
}

.leg.front-right {
  left: 30px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite 0.5s;
}

.leg.back-left {
  right: 25px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite 1s;
}

.leg.back-right {
  right: 18px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite 1.5s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes bodyFloat {
  0%, 100% { transform: rotate(-2deg) translateY(0); }
  50% { transform: rotate(2deg) translateY(-3px); }
}

@keyframes headFloat {
  0%, 100% { transform: rotate(0deg) translateY(0); }
  50% { transform: rotate(4deg) translateY(-5px); }
}

@keyframes waterRipple {
  0%, 100% { 
    transform: translateX(-50%) scaleX(1);
    opacity: 0.7;
  }
  50% { 
    transform: translateX(-50%) scaleX(1.15);
    opacity: 0.9;
  }
}

@keyframes waterReflection {
  0%, 100% {
    transform: translateX(-50%) scaleY(0.3);
    opacity: 0.8;
  }
  50% {
    transform: translateX(-50%) scaleY(0.4) translateY(3px);
    opacity: 1;
  }
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
</style>
