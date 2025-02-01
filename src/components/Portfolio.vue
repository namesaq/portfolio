<template>
  <div class="portfolio">
    <div class="section">
      <h1 class="title">{{ isEnglish ? 'Portfolio' : 'Портфолио' }}</h1>
      
      <div class="projects">
        <div class="project" v-for="project in projects" :key="project.id" @click="openModal(project)">
          <div class="project-content">
            <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }">
              <div class="image-loader" v-if="loading"></div>
              <div class="project-overlay">
                <div class="project-info">
                  <h3 class="project-title">{{ project.title }}</h3>
                  <div class="project-tags">
                    <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно -->
    <div class="modal" v-if="selectedProject" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-nav">
          <button class="modal-nav-button" @click="prevProject">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="modal-nav-button" @click="nextProject">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <div class="modal-gallery">
          <div class="gallery-main">
            <img :src="selectedProject.mainImage" :alt="selectedProject.title">
          </div>
          <div class="project-info">
            <h2>{{ selectedProject.title }}</h2>
            <p>{{ selectedProject.description }}</p>
            <div class="project-tags">
              <span v-for="tag in selectedProject.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Полноэкранное изображение -->
    <div class="fullscreen-image" v-if="fullscreenImage" @click="closeFullImage">
      <img :src="fullscreenImage" alt="Fullscreen">
      <button class="fullscreen-close" @click="closeFullImage">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <BottomSheet v-model:isVisible="showDetails" v-if="selectedProject">
      <div class="project-details">
        <h2>{{ selectedProject.title }}</h2>
        <p>{{ selectedProject.description }}</p>
        <div class="project-tags">
          <span v-for="tag in selectedProject.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
        <div class="project-gallery">
          <img 
            v-for="image in selectedProject.gallery" 
            :key="image" 
            :src="image" 
            @click="openFullImage(image)"
          >
        </div>
      </div>
    </BottomSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useHapticFeedback } from '@/composables/useHapticFeedback';
import BottomSheet from '@/components/BottomSheet.vue';

const props = defineProps<{
  isEnglish: boolean
}>();

interface Project {
  id: number;
  title: string;
  image: string;
  mainImage: string;
  gallery: string[];
  tags: string[];
  description: string;
}

const selectedProject = ref<Project | null>(null);
const fullscreenImage = ref<string | null>(null);
const showDetails = ref(false);
const loading = ref(true);

const projects = ref<Project[]>([
  {
    id: 1,
    title: props.isEnglish ? "LOOK ALIKE" : "LOOK ALIKE",
    image: "/images/projects/photographer-main.jpg",
    mainImage: "/images/projects/photographer-main.jpg",
    gallery: [],
    tags: props.isEnglish 
      ? ["Vue.js", "Portfolio", "Web Design"] 
      : ["Vue.js", "Портфолио", "Веб-дизайн"],
    description: props.isEnglish 
      ? "Professional photographer portfolio website with modern design and responsive interface. The site is designed to showcase works and attract new clients."
      : "Профессиональный сайт-портфолио фотографа с современным дизайном и адаптивным интерфейсом. Сайт разработан для демонстрации работ и привлечения новых клиентов."
  },
  {
    id: 2,
    title: props.isEnglish ? "Web Application" : "Веб-приложение",
    image: "/images/projects/project2-main.jpg",
    mainImage: "/images/projects/project2-main.jpg",
    gallery: [],
    tags: props.isEnglish 
      ? ["Vue.js", "TypeScript", "UI/UX"] 
      : ["Vue.js", "TypeScript", "UI/UX"],
    description: props.isEnglish 
      ? "Modern web application with responsive design and interactive interface"
      : "Современное веб-приложение с адаптивным дизайном и интерактивным интерфейсом"
  },
  {
    id: 3,
    title: props.isEnglish ? "Mobile Application" : "Мобильное приложение",
    image: "/images/projects/mobile-app.jpg",
    mainImage: "/images/projects/mobile-app.jpg",
    gallery: [],
    tags: props.isEnglish 
      ? ["React Native", "TypeScript", "Mobile"] 
      : ["React Native", "TypeScript", "Мобильная разработка"],
    description: props.isEnglish 
      ? "Cross-platform mobile application with modern design and smooth animations"
      : "Кроссплатформенное мобильное приложение с современным дизайном и плавными анимациями"
  }
]);

// Добавляем навигацию между проектами
const currentProjectIndex = ref(0);

const slideDirection = ref<'prev' | 'next' | null>(null);

const openModal = (project: Project) => {
  selectedProject.value = project;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedProject.value = null;
  document.body.style.overflow = 'auto';
};

const openFullImage = (image: string) => {
  fullscreenImage.value = image;
};

const closeFullImage = () => {
  fullscreenImage.value = null;
};

const nextProject = () => {
  if (selectedProject.value) {
    slideDirection.value = 'next';
    setTimeout(() => {
      const currentIndex = projects.value.findIndex(p => p.id === selectedProject.value!.id);
      const nextIndex = (currentIndex + 1) % projects.value.length;
      selectedProject.value = projects.value[nextIndex];
      slideDirection.value = null;
    }, 300);
  }
};

const prevProject = () => {
  if (selectedProject.value) {
    slideDirection.value = 'prev';
    setTimeout(() => {
      const currentIndex = projects.value.findIndex(p => p.id === selectedProject.value!.id);
      const prevIndex = currentIndex === 0 ? projects.value.length - 1 : currentIndex - 1;
      selectedProject.value = projects.value[prevIndex];
      slideDirection.value = null;
    }, 300);
  }
};

// Добавляем обработчик клавиш
onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
});

const handleKeyPress = (e: KeyboardEvent) => {
  if (selectedProject.value) {
    if (e.key === 'ArrowRight') nextProject();
    if (e.key === 'ArrowLeft') prevProject();
    if (e.key === 'Escape') closeModal();
  }
};

let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (e: Event) => {
  const touchEvent = e as TouchEvent;
  touchStartX = touchEvent.touches[0].clientX;
};

const handleTouchMove = (e: Event) => {
  const touchEvent = e as TouchEvent;
  touchEndX = touchEvent.touches[0].clientX;
};

const handleTouchEnd = () => {
  const swipeThreshold = 50;
  const diff = touchEndX - touchStartX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      prevProject();
    } else {
      nextProject();
    }
  }
};

onMounted(() => {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.addEventListener('touchstart', handleTouchStart as EventListener);
    modalContent.addEventListener('touchmove', handleTouchMove as EventListener);
    modalContent.addEventListener('touchend', handleTouchEnd as EventListener);
  }
});

onUnmounted(() => {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.removeEventListener('touchstart', handleTouchStart as EventListener);
    modalContent.removeEventListener('touchmove', handleTouchMove as EventListener);
    modalContent.removeEventListener('touchend', handleTouchEnd as EventListener);
  }
});

// Добавляем параллакс эффект
const handleMouseMove = (e: MouseEvent) => {
  const cards = document.querySelectorAll('.project');
  cards.forEach((card: Element) => {
    const rect = (card as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
    (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
  });
};

// Добавляем анимированный фон
const initAnimatedBackground = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // ... код для анимированного фона
};

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove);
  initAnimatedBackground();
});

const { lightTap } = useHapticFeedback();

const openProjectDetails = (project: Project) => {
  selectedProject.value = project;
  showDetails.value = true;
  lightTap();
};
</script>

<style scoped>
.portfolio {
  padding: 2rem;
  color: var(--text-primary);
  background: var(--bg-primary);
  min-height: 100vh;
  transition: all 0.3s ease;
}

.section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  background: var(--bg-primary);
  transition: all 0.3s ease;
}

.title {
  color: var(--text-primary);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  padding: 0 20px;
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 20px;
}

.project {
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.project:hover {
  transform: translateY(-5px);
  border-color: var(--accent-primary);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.project-content {
  position: relative;
  padding-top: 66.67%;
}

.project-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: none;
  transition: all 0.3s ease;
}

.project:hover .project-image {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.8)
  );
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 1;
  transition: all 0.3s ease;
  z-index: 1;
}

.project:hover .project-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.9)
  );
}

.project-info {
  color: #fff;
  z-index: 2;
  position: relative;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

.project-title {
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  font-weight: 600;
  filter: none !important;
}

.project .project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
}

.project .tag {
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 100px;
  font-size: 0.9rem;
  color: #fff;
  transition: all 0.3s ease;
  filter: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  font-weight: 500;
}

.project:hover .tag {
  background: rgba(0, 0, 0, 0.6);
  border-color: rgba(255, 255, 255, 0.4);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
}

.tag {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  font-size: 0.9rem;
  color: #fff;
  transition: all 0.3s ease;
  filter: none !important;
}

.tag:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.3);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.gallery-grid img {
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.gallery-grid img:hover {
  transform: scale(1.05);
}

/* Модальное окно */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-primary);
  border-radius: 24px;
  padding: 2rem;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: var(--bg-secondary);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-primary);
  transition: all 0.3s ease;
  z-index: 1;
  font-size: 1.2rem;
}

.modal-close:hover {
  background: var(--hover-bg);
  color: var(--accent-primary);
  transform: rotate(90deg);
}

.modal-gallery {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.gallery-main {
  position: relative;
  width: 100%;
  height: 70vh;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.gallery-main img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 16px;
  object-fit: cover;
}

.project-info {
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 16px;
  margin-top: 2rem;
  border: 1px solid var(--border-color);
}

.project-info h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.project-info p {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tag {
  padding: 0.8rem 1.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 100px;
  font-size: 1rem;
  color: var(--text-primary);
  transition: all 0.3s ease;
  backdrop-filter: none;
  filter: none !important;
}

.tag:hover {
  background: var(--bg-secondary);
  transform: translateY(-2px);
  border-color: var(--accent-primary);
}

/* Полноэкранное изображение */
.fullscreen-image {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.fullscreen-image img {
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
}

.fullscreen-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #FFF;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .portfolio {
    padding: 1rem;
    padding-top: calc(env(safe-area-inset-top) + 60px);
    padding-bottom: calc(var(--bottom-nav-height) + 2rem);
  }

  .projects {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .project {
    width: 100%;
    aspect-ratio: 3/2;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.2) 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.6rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 1rem;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .tag {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 100px;
    color: #fff;
  }

  /* Модальное окно для мобильных */
  .modal-content {
    width: 100%;
    height: 100vh;
    border-radius: 0;
    padding: 1rem;
    background: var(--bg-primary);
    position: relative;
    overflow-y: auto;
  }

  .modal-close {
    position: fixed;
    top: calc(env(safe-area-inset-top) + 10px);
    right: 10px;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border: none;
    z-index: 1002; /* Выше чем у переключателя языка */
  }

  .gallery-main {
    margin-top: calc(env(safe-area-inset-top) + 60px);
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .gallery-main img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-info {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    margin-bottom: 1.5rem;
  }

  .project-info h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  .project-info p {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1rem;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: calc(var(--bottom-nav-height) + 2rem);
  }

  .gallery-grid img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 12px;
  }
}

/* Маленькие телефоны */
@media (max-width: 360px) {
  .title {
    font-size: 2rem;
  }

  .project-title {
    font-size: 1.1rem;
  }

  .tag {
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
  }
}

/* Добавляем поддержку жестов для мобильных */
@media (hover: none) {
  .project:hover {
    transform: none;
  }

  .project-overlay {
    opacity: 1;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  }

  .project-info {
    transform: translateY(0);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.05);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white-pure);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
}

.nav-button:hover {
  background: rgba(147, 51, 234, 0.2);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 5px 15px rgba(147, 51, 234, 0.1);
}

.nav-button.prev {
  left: 20px;
}

.nav-button.next {
  right: 20px;
}

.project-info {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  margin: 1rem 0;
}

.project-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--white-pure);
}

.project-info p {
  color: var(--white-muted);
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* Анимация для смены проектов */
.modal-gallery {
  transition: all 0.3s ease;
  opacity: 1;
  transform: translateX(0);
}

.modal-gallery.sliding-prev {
  opacity: 0;
  transform: translateX(100px);
}

.modal-gallery.sliding-next {
  opacity: 0;
  transform: translateX(-100px);
}

.progress-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.progress-dot.active {
  background: #9D5BD2;
  transform: scale(1.5);
}

.progress-dot:hover {
  background: rgba(147, 51, 234, 0.5);
  transform: scale(1.2);
}

.image-loader {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.project-details {
  padding: 20px;
}

.project-details h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--white-pure);
}

.project-details p {
  color: var(--white-muted);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 1rem;
}

.project-gallery img {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
}

/* Ландшафтная ориентация */
@media (max-width: 768px) and (orientation: landscape) {
  .projects {
    grid-template-columns: repeat(2, 1fr);
  }
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 30px;
}

.portfolio-item {
  background: rgba(147, 51, 234, 0.03);
  border: 1px solid rgba(147, 51, 234, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.portfolio-item:hover {
  transform: translateY(-5px);
  border-color: rgba(147, 51, 234, 0.2);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.1);
}

.portfolio-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/9;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.05);
}

.portfolio-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(147, 51, 234, 0.8), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-content {
  padding: 20px;
}

.portfolio-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #9333EA, #7C3AED);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.portfolio-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.portfolio-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
}

.portfolio-tag {
  padding: 5px 12px;
  background: rgba(147, 51, 234, 0.1);
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 100px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.portfolio-tag:hover {
  background: rgba(147, 51, 234, 0.2);
  transform: translateY(-2px);
}

.project-title {
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.project .project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
}

.project .tag {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  font-size: 0.9rem;
  color: #fff;
  transition: all 0.3s ease;
  filter: none !important;
}

.project .tag:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Стили для тегов в модальном окне */
.modal .project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.modal .project-info .tag {
  padding: 0.8rem 1.5rem !important;
  background: var(--bg-primary) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 100px !important;
  font-size: 1rem !important;
  color: var(--text-primary) !important;
  transition: all 0.3s ease !important;
  backdrop-filter: none !important;
  filter: none !important;
  -webkit-backdrop-filter: none !important;
}

.modal .project-info .tag:hover {
  background: var(--bg-secondary) !important;
  transform: translateY(-2px) !important;
  border-color: var(--accent-primary) !important;
}

/* Стрелки навигации в модальном окне */
.modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 4rem);
  padding: 10px;
  z-index: 2;
  pointer-events: none;
}

.modal-nav-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}


.modal-nav-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(147, 51, 234, 0.15),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal-nav-button:hover {
  transform: scale(1.1);
  border-color: rgba(147, 51, 234, 0.6);
  box-shadow: 
    0 6px 16px rgba(0, 0, 0, 0.15),
    0 0 20px rgba(147, 51, 234, 0.3);
}

.modal-nav-button:hover::before {
  opacity: 1;
}

.modal-nav-button i {
  font-size: 1.2rem;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  color: var(--text-primary);
}

.modal-nav-button:hover i {
  color: rgba(147, 51, 234, 0.8);
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .modal-nav {
    padding: 0 1rem;
  }

  .modal-nav-button {
    width: 40px;
    height: 40px;
  }

  .modal-nav-button i {
    font-size: 1rem;
  }
}
</style>

