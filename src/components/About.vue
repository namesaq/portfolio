<template>
  <div class="about">
    <div class="about-container">
      <!-- Секция с фото и кратким представлением -->
      <div class="hero-section">
        <div class="profile-container">
          <div class="profile-photo">
            <img src="/fle2alB5l1k.jpg" alt="Maria Kalinina">
          </div>
          <div class="profile-title">
            <h1>{{ isEnglish ? 'Maria Kalinina' : 'Мария Калинина' }}</h1>
            <p class="profession">{{ isEnglish ? 'Frontend Developer' : 'Frontend Разработчик' }}</p>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <!-- Блок личной информации -->
        <div class="section personal-section">
          <div class="section-header">
            <i class="fa-solid fa-user-astronaut icon"></i>
            <h2>{{ isEnglish ? 'About Me' : 'О себе' }}</h2>
          </div>
          <div class="personal-content">
            <div class="info-card">
              <div class="info-text">
                <span class="birth-date">{{ isEnglish ? 'Born: August 12, 2005' : 'Дата рождения: 12 августа 2005' }}</span>
              </div>
            </div>
            <div class="about-text">
              <p>{{ isEnglish ? 'I am a frontend developer with a passion for creating beautiful and functional web applications. I specialize in Vue.js and modern web technologies, combining technical skills with an eye for design.' : 'Я frontend-разработчик, увлеченная созданием красивых и функциональных веб-приложений. Специализируюсь на Vue.js и современных веб-технологиях, сочетая технические навыки с чувством дизайна.' }}</p>
            </div>
          </div>
        </div>

        <!-- Блок навыков -->
        <div class="section skills-section">
          <div class="section-header">
            <i class="fa-solid fa-code icon"></i>
            <h2>{{ isEnglish ? 'Skills' : 'Навыки' }}</h2>
          </div>
          <div class="skills-grid">
            <div class="skill-category">
              <h3>Design</h3>
              <div class="skill-items">
                <span class="skill-tag">Figma</span>
                <span class="skill-tag">Adobe XD</span>
                <span class="skill-tag">Photoshop</span>
              </div>
            </div>
            <div class="skill-category">
              <h3>Development</h3>
              <div class="skill-items">
                <span class="skill-tag">Vue.js</span>
                <span class="skill-tag">TypeScript</span>
                <span class="skill-tag">SCSS</span>
                <span class="skill-tag">Python</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Блок опыта -->
        <div class="section experience-section">
          <div class="section-header">
            <i class="fa-solid fa-rocket icon"></i>
            <h2>{{ isEnglish ? 'Experience' : 'Опыт' }}</h2>
          </div>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-date">2023 - Present</div>
              <div class="timeline-content">
                <h3>Web Designer</h3>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">2020 - 2022</div>
              <div class="timeline-content">
                <h3>Frontend Developer</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  isEnglish: boolean
}>();
</script>

<style scoped>
.about {
  background-color: #1A1A1A;
  min-height: 100vh;
  padding: 80px 30px 30px;
  color: #F5F5F5;
}

.about-container {
  max-width: 1400px;
  margin: 0 auto;
}

.hero-section {
  margin-bottom: 60px;
}

.profile-container {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 40px;
  background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  border-radius: 24px;
  backdrop-filter: blur(10px);
}

.profile-photo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.profile-title h1 {
  font-size: 3.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.profession {
  font-size: 1.5rem;
  color: rgba(255,255,255,0.7);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

.section {
  padding: 30px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.section:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.icon {
  font-size: 24px;
  margin-right: 15px;
  color: #9D5BD2;
  opacity: 0.8;
}

.skills-grid {
  display: grid;
  gap: 30px;
}

.skill-category h3 {
  color: rgba(255,255,255,0.9);
  margin-bottom: 15px;
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 15px rgba(147, 51, 234, 0.1);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.timeline-item:hover {
  box-shadow: 0 5px 15px rgba(147, 51, 234, 0.1);
}

.timeline-date {
  color: rgba(255,255,255,0.6);
  font-size: 0.9rem;
}

.timeline-content h3 {
  color: rgba(255,255,255,0.9);
  margin-bottom: 5px;
}

.timeline-content p {
  color: rgba(255,255,255,0.6);
}

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    text-align: center;
  }

  .profile-title h1 {
    font-size: 2.5rem;
  }

  .timeline-item {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

.placeholder-photo {
  display: none;
}

.info-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.1);
}

.birth-date {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  letter-spacing: 0.5px;
  text-align: center;
}

.quote-card {
  display: none;
}

.personal-section {
  background: rgba(255, 255, 255, 0.03);
  animation: slideIn 0.8s ease forwards;
  animation-delay: 0.6s;
  opacity: 1;
}

.about-text {
  padding: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.about-text p {
  margin-bottom: 1rem;
}

.section-header h2 {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.8rem;
  font-weight: 600;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
