<template>
  <main class="container">
    <!-- Левая панель -->
    <nav class="sidebar">
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

const { lightTap } = useHapticFeedback();

const handleNavClick = (id: number) => {
  lightTap();
  activeTab.value = id;
};

const changeLanguage = (value: boolean) => {
  isEnglish.value = value;
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
}

.sidebar button {
  background: transparent;
  border: none;
  padding: 1rem 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--white-muted);
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
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
  color: var(--white-pure);
  padding-left: 2rem;
}

.sidebar button.active {
  color: var(--white-pure);
  padding-left: 2rem;
}

.sidebar button:hover i,
.sidebar button.active i {
  color: var(--accent-primary);
}

/* Правая часть */
.content {
  flex: 1;
  position: relative;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  margin-left: 240px; /* Равно ширине sidebar */
  padding-left: 2rem;
}

/* Переключатель языка */
.language-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 2px;
  background: var(--surface-dark);
  padding: 2px;
  border-radius: 12px;
  z-index: 1001;
}

.language-switcher button {
  background: transparent;
  border: none;
  padding: 8px 16px;
  color: var(--white-muted);
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
}

.language-switcher button.active {
  color: var(--white-pure);
  background: rgba(255, 255, 255, 0.1);
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
    width: 100%;
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
    position: fixed;
    top: calc(env(safe-area-inset-top) + 20px);
    right: 20px;
    background: rgba(26, 26, 26, 0.9);
    backdrop-filter: blur(10px);
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
</style>
