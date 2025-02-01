<template>
  <div class="contact">
    <div class="section">
      <h1 class="title">{{ isEnglish ? 'Contact Me' : 'Связаться со мной' }}</h1>
      
      <div class="title-decoration">
        <div class="wave"></div>
      </div>
      
      <div class="contacts-container">
        <div class="contact-circle">
          <a href="https://t.me/Coconutanita" target="_blank" class="contact-link telegram">
            <i class="fab fa-telegram"></i>
          </a>
        </div>
        
        <div class="contact-circle">
          <a href="https://vk.com/fanatka_19a" target="_blank" class="contact-link vk">
            <i class="fab fa-vk"></i>
          </a>
        </div>
        
        <div class="contact-circle">
          <a href="https://github.com/namesaq" target="_blank" class="contact-link github">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isEnglish: boolean
}>();
</script>

<style scoped>
.contact {
  background-color: var(--bg-primary);
  min-height: 100vh;
  padding: 80px 30px 30px;
  position: relative;
  transition: background-color 0.3s ease;
  overflow-x: hidden;
}

.section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  background: var(--bg-primary);
  transition: all 0.3s ease;
}

.title {
  margin-top: 3rem;
  color: var(--text-primary);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.title-decoration {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  height: 30px;
}

.title-decoration .wave {
  position: relative;
  width: 200px;
  height: 2px;
  background: rgba(147, 51, 234, 0.3);
  overflow: hidden;
}

.title-decoration .wave::before {
  content: '';
  position: absolute;
  width: 200px;
  height: 2px;
  background: rgba(147, 51, 234, 0.8);
  animation: wave 2s infinite linear;
}

.title-decoration::before,
.title-decoration::after {
  content: '❋';
  font-size: 1.2rem;
  color: rgba(147, 51, 234, 0.8);
  margin: 0 1rem;
  animation: rotate 4s infinite linear;
}

@keyframes wave {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.contacts-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6rem;
  padding: 2rem 6rem;
}

.contact-circle {
  width: 110px;
  height: 110px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-circle::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(147, 51, 234, 0.8),
    rgba(124, 58, 237, 0.8),
    rgba(147, 51, 234, 0.2),
    rgba(124, 58, 237, 0.8),
    rgba(147, 51, 234, 0.8)
  );
  animation: spin 4s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-circle:hover::before {
  opacity: 1;
}

.contact-link {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--bg-primary);
  border: none;
  color: var(--text-primary);
  font-size: 2.8rem;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 2px rgba(147, 51, 234, 0.2),
    0 0 0 2px var(--bg-primary);
}

.contact-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(147, 51, 234, 0.15),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-link:hover {
  transform: scale(1.1);
  color: #9333EA;
  box-shadow: 
    inset 0 0 0 2px rgba(147, 51, 234, 0.6),
    0 0 0 2px var(--bg-primary),
    0 0 30px rgba(147, 51, 234, 0.3);
}

.contact-link:hover::before {
  opacity: 1;
}

.contact-link i {
  position: relative;
  z-index: 1;
  transition: all 0.4s ease;
  filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.3));
}

.contact-link:hover i {
  transform: scale(1.1);
  filter: drop-shadow(0 0 12px rgba(147, 51, 234, 0.6));
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .contact {
    padding: 60px 20px 20px;
  }

  .title {
    margin-top: 2rem;
    font-size: 2rem;
  }

  .title-decoration .wave {
    width: 150px;
  }

  .contacts-container {
    flex-direction: column;
    gap: 3rem;
    padding: 1rem 3rem;
  }

  .contact-circle {
    width: 90px;
    height: 90px;
  }

  .contact-link {
    font-size: 2.2rem;
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style>
  