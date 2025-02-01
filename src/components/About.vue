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
  min-height: 100vh;
  padding: 80px 30px 30px;
  color: var(--text-primary);
  background: var(--bg-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  overflow-x: hidden;
}

.about-container {
  max-width: 1400px;
  margin: 0 auto;
  background: var(--bg-primary);
  transition: background-color 0.3s ease;
}

.hero-section {
  margin-bottom: 60px;
}

.profile-container {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 40px;
  background: var(--bg-secondary);
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.profile-photo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--border-color);
  background: var(--bg-secondary);
  transition: all 0.3s ease;
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
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.profession {
  font-size: 1.5rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

.section {
  padding: 30px;
  background: var(--bg-secondary);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(30px);
  animation: sectionAppear 0.5s ease-out forwards;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}

.personal-section {
  animation-delay: 0.2s;
}

.skills-section {
  animation-delay: 0.3s;
}

.experience-section {
  animation-delay: 0.4s;
}

@keyframes sectionAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section:hover {
  transform: translateY(-5px);
  border-color: var(--accent-primary);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.1);
  transition: all 0.3s ease;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.icon {
  font-size: 24px;
  margin-right: 15px;
  color: var(--accent-primary);
  opacity: 0.8;
}

.skills-grid {
  display: grid;
  gap: 30px;
}

.skill-category h3 {
  color: var(--text-primary);
  margin-bottom: 15px;
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  padding: 8px 16px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 100px;
  font-size: 0.9rem;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: var(--hover-bg);
  transform: translateY(-2px);
  border-color: var(--accent-primary);
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
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}

.timeline-item:hover {
  box-shadow: 0 5px 15px rgba(147, 51, 234, 0.1);
}

.timeline-date {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.timeline-content h3 {
  color: var(--text-primary);
  margin-bottom: 5px;
  font-weight: 500;
}

.timeline-content p {
  color: var(--text-secondary);
  line-height: 1.6;
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
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-primary);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.1);
}

.birth-date {
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 400;
  letter-spacing: 0.5px;
  text-align: center;
  transition: all 0.3s ease;
}

.quote-card {
  display: none;
}

.about-text {
  padding: 1.5rem;
  color: var(--text-primary);
  line-height: 1.8;
  font-size: 1.1rem;
  background: var(--bg-primary);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.about-text p {
  margin-bottom: 1rem;
}

.section-header h2 {
  color: var(--text-primary);
  font-size: 1.8rem;
  font-weight: 600;
}
</style>
