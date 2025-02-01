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
        
        <!-- Навигационные кнопки -->
        <button class="nav-button prev" @click.stop="prevProject">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="nav-button next" @click.stop="nextProject">
          <i class="fas fa-chevron-right"></i>
        </button>
        
        <!-- Добавляем индикатор прогресса -->
        <div class="progress-indicator">
          <div 
            v-for="(project, index) in projects" 
            :key="project.id"
            :class="['progress-dot', { active: selectedProject?.id === project.id }]"
            @click="selectedProject = projects[index]"
          ></div>
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
          <div class="gallery-grid">
            <img v-for="image in selectedProject.gallery" 
                 :key="image" 
                 :src="image" 
                 :alt="selectedProject.title"
                 @click="openFullImage(image)"
            >
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

defineProps<{
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

const projects = ref<Project[]>([
  {
    id: 1,
    title: "Modern Web Application",
    image: "/project1.jpg",
    mainImage: "/main1.jpg",
    gallery: [
      "/gallery1.jpg",
      "/gallery2.jpg",
      "/gallery3.jpg",
      "/gallery4.jpg"
    ],
    tags: ["Vue.js", "TypeScript", "UI/UX"],
    description: "Современное веб-приложение с адаптивным дизайном"
  },
  {
    id: 2,
    title: "E-commerce Platform",
    image: "/project2.jpg",
    mainImage: "/main2.jpg",
    gallery: [
      "/gallery5.jpg",
      "/gallery6.jpg",
      "/gallery7.jpg",
      "/gallery8.jpg"
    ],
    tags: ["React", "Node.js", "E-commerce"],
    description: "Платформа электронной коммерции"
  },
  {
    id: 3,
    title: "Mobile Application",
    image: "/project3.jpg",
    mainImage: "/main3.jpg",
    gallery: [
      "/gallery9.jpg",
      "/gallery10.jpg",
      "/gallery11.jpg",
      "/gallery12.jpg"
    ],
    tags: ["Mobile", "React Native", "UX"],
    description: "Мобильное приложение"
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

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX;
};

const handleTouchMove = (e: TouchEvent) => {
  touchEndX = e.touches[0].clientX;
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
    modalContent.addEventListener('touchstart', handleTouchStart);
    modalContent.addEventListener('touchmove', handleTouchMove);
    modalContent.addEventListener('touchend', handleTouchEnd);
  }
});

onUnmounted(() => {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.removeEventListener('touchstart', handleTouchStart);
    modalContent.removeEventListener('touchmove', handleTouchMove);
    modalContent.removeEventListener('touchend', handleTouchEnd);
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
  color: #F5F5F5;
  background-color: #1A1A1A;
  min-height: 100vh;
  padding: 80px 30px 30px;
}

.section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.title {
  font-size: 3.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

.project {
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  border-radius: 20px;
  aspect-ratio: 4/3;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.project:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.1);
}

.project::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.project:hover::before {
  opacity: 1;
}

.project-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
}

.project:hover .project-overlay {
  opacity: 1;
}

.project-info {
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.project:hover .project-info {
  transform: translateY(0);
}

.project-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #FFF;
}

.project-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 100px;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
}

/* Модальное окно */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 1400px;
  max-height: 90vh;
  background: #1A1A1A;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  animation: modalAppear 0.5s ease forwards;
  box-shadow: 0 20px 40px rgba(147, 51, 234, 0.15);
}

.modal-close {
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
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.8);
}

.modal-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
}

.gallery-main {
  width: 100%;
  height: 50vh;
  border-radius: 16px;
  overflow: hidden;
}

.gallery-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery-grid img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

.gallery-grid img:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(147, 51, 234, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gallery-grid img:nth-child(1) { animation-delay: 0.1s; }
.gallery-grid img:nth-child(2) { animation-delay: 0.2s; }
.gallery-grid img:nth-child(3) { animation-delay: 0.3s; }
.gallery-grid img:nth-child(4) { animation-delay: 0.4s; }

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
</style>

