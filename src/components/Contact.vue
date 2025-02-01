<template>
  <div class="contact">
    <div class="section">
      <h1 class="title">{{ isEnglish ? 'Contacts' : 'Контакты' }}</h1>
      
      <div class="contact-grid">
        <!-- Основной блок контактов -->
        <div class="contact-main">
          <div class="social-links">
            <a href="https://t.me/Coconutanita" target="_blank" class="social-link">
              <div class="social-icon">
                <i class="fab fa-telegram"></i>
              </div>
              <span class="social-name">Telegram</span>
              <div class="link-arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
            </a>

            <a href="https://vk.com/fanatka_19a" target="_blank" class="social-link">
              <div class="social-icon">
                <i class="fab fa-vk"></i>
              </div>
              <span class="social-name">VKontakte</span>
              <div class="link-arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
            </a>
          </div>
        </div>

        <!-- Декоративный элемент -->
        <div class="contact-decoration">
          <div class="capybara">
            <div class="capybara-body"></div>
            <div class="capybara-head">
              <div class="capybara-ear right"></div>
              <div class="capybara-eye left"></div>
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
}

.section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  text-align: left;
  margin-bottom: 3rem;
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

.subtitle {
  font-size: 1.2rem;
  color: var(--white-muted);
  font-weight: 400;
}

.contact-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
}

.contact-main {
  position: relative;
  background: var(--surface-dark);
  border-radius: 16px;
  padding: 1.5rem;
  overflow: hidden;
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.contact-decoration {
  display: flex;
  position: relative;
  justify-content: center;
  height: 200px;
  width: 40%;
  min-width: 300px;
  overflow: visible;
  padding-left: 20px;
}

.capybara {
  width: 180px;
  height: 100px;
  animation: waddle 4s ease-in-out infinite;
  margin-left: 25px;
}

.capybara-body {
  position: absolute;
  width: 145px;
  height: 80px;
  background: rgba(157, 91, 210, 0.1);
  border: 1px solid rgba(157, 91, 210, 0.2);
  border-radius: 75px 85px 65px 55px;
  bottom: 10px;
  right: 10px;
  transform: rotate(-2deg);
  transform-origin: bottom center;
  animation: bodyWobble 4s ease-in-out infinite;
}

.capybara-head {
  position: absolute;
  width: 75px;
  height: 50px;
  background: rgba(157, 91, 210, 0.1);
  border: 1px solid rgba(157, 91, 210, 0.2);
  border-radius: 35px 40px 30px 25px;
  right: 130px;
  bottom: 30px;
  top: 10px;
  animation: headBob 4s ease-in-out infinite;
}

.capybara-ear {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(157, 91, 210, 0.1);
  border: 1px solid rgba(157, 91, 210, 0.2);
  border-radius: 50%;
}


.capybara-ear.right {
  right: 20px;
  top: -5px;
}

.capybara-eye {
  position: absolute;
  width: 6px;
  height: 3px;
  background: rgba(157, 91, 210, 0.4);
  border-radius: 50%;
  top: 10px;
  animation: blink 4s ease-in-out infinite;
}

.capybara-eye.left {
  left: 35px;
  border-radius: 100% 200% 100% 100%;
}


.capybara-nose {
  position: absolute;
  width: 20px;
  height: 15px;
  background: rgba(157, 91, 210, 0.2);
  border-radius: 20px 15px 15px 15px;
  left: 12%;
  top: 20px;
  transform: translateX(-50%);
}

.capybara-legs .leg {
  position: absolute;
  width: 12px;
  height: 16px;
  background: rgba(157, 91, 210, 0.1);
  border: 1px solid rgba(157, 91, 210, 0.2);
  border-radius: 8px;
}

.leg.front-left {
  left: 40px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite;
}

.leg.front-right {
  left: 60px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite 0.5s;
}

.leg.back-left {
  right: 60px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite 1s;
}

.leg.back-right {
  right: 40px;
  bottom: 0;
  animation: legMove 2s ease-in-out infinite 1.5s;
}

@keyframes waddle {
  0%, 100% { 
    transform: translateX(0px) rotate(0deg); 
  }
  25% { 
    transform: translateX(0px) rotate(1deg) translateY(-2px); 
  }
  75% { 
    transform: translateX(0px) rotate(-1deg) translateY(2px); 
  }
}

@keyframes bodyWobble {
  0%, 100% { 
    transform: rotate(-2deg); 
  }
  50% { 
    transform: rotate(-1deg); 
  }
}

@keyframes headBob {
  0%, 100% { 
    transform: rotate(0deg); 
  }
  25% { 
    transform: rotate(2deg) translateY(-2px); 
  }
  75% { 
    transform: rotate(-2deg) translateY(2px); 
  }
}

@keyframes blink {
  0%, 45%, 55%, 100% { 
    transform: scaleY(1);
    opacity: 1;
  }
  50% { 
    transform: scaleY(0.1);
    opacity: 0.8;
  }
}

@keyframes legMove {
  0%, 100% { 
    transform: translateY(0); 
  }
  25% { 
    transform: translateY(-3px) rotate(3deg); 
  }
  75% { 
    transform: translateY(0) rotate(-3deg); 
  }
}

.social-links {
  display: grid;
  gap: 1rem;
  padding: 0.5rem;
  width: 40%;
  min-width: 300px;
}

.social-link {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  text-decoration: none;
  color: var(--white-muted);
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid rgba(157, 91, 210, 0.05);
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, 
    rgba(157, 91, 210, 0.03) 0%, 
    rgba(157, 91, 210, 0.01) 50%,
    rgba(157, 91, 210, 0) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link:hover::before {
  opacity: 1;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.03);
  transform: translateX(2px);
  border-color: rgba(157, 91, 210, 0.15);
  box-shadow: 0 4px 12px rgba(157, 91, 210, 0.08);
}

.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.03);
  margin-right: 1rem;
  transition: all 0.3s ease;
}

.social-link:hover .social-icon {
  background: rgba(255, 255, 255, 0.05);
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(157, 91, 210, 0.06);
}

.social-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--white-muted);
  transition: color 0.3s ease;
}

.social-link:hover .social-name {
  color: rgba(255, 255, 255, 0.95);
}

.link-arrow {
  margin-left: auto;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateX(-5px);
}

.social-link:hover .link-arrow {
  opacity: 0.8;
  transform: translateX(0);
}

@keyframes subtleArrow {
  0% { transform: translateX(0); }
  50% { transform: translateX(3px); }
  100% { transform: translateX(0); }
}

.social-link:hover .link-arrow i {
  animation: subtleArrow 2s ease-in-out infinite;
}

/* Иконки без яркого цвета */
.fa-telegram, .fa-vk { 
  color: var(--white-dim);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .contact {
    padding: 1rem;
    padding-top: calc(env(safe-area-inset-top) + 60px);
    padding-bottom: calc(var(--bottom-nav-height) + 1rem);
    text-align: center;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }

  .contact-main {
    position: relative;
    top: 0;
    width: 100%;
  }

  .social-link {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .social-icon {
    width: 40px;
    height: 40px;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .social-name {
    flex: 1;
    text-align: left;
    font-size: 1rem;
  }

  .nav {
    position: relative;
    top: 0;
    width: 100%;
  }
  
  .contact-decoration {
    padding-left: 0;
    margin-top: 30px;
  }
  
  .capybara {
    transform: translateX(-100px);
  }
  
  .sidebar {
    position: fixed;
    bottom: 0;
    top: auto;
    width: 100%;
    height: var(--bottom-nav-height);
    flex-direction: row;
    padding: 0;
  }
  
  .content {
    margin-left: 0;
    padding-bottom: calc(var(--bottom-nav-height) + 2rem);
  }
}

@keyframes arrowMove {
  0% { transform: translateX(0); }
  50% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}

.social-link:hover .link-arrow i {
  animation: arrowMove 1s ease infinite;
}

.contact-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: rgba(147, 51, 234, 0.03);
  border: 1px solid rgba(147, 51, 234, 0.1);
  border-radius: 24px;
  backdrop-filter: blur(10px);
}

.contact-header {
  text-align: center;
  margin-bottom: 40px;
}

.contact-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #9333EA, #7C3AED);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.contact-method {
  padding: 30px;
  background: rgba(147, 51, 234, 0.05);
  border: 1px solid rgba(147, 51, 234, 0.1);
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.contact-method:hover {
  transform: translateY(-5px);
  border-color: rgba(147, 51, 234, 0.2);
  box-shadow: 0 10px 30px rgba(147, 51, 234, 0.1);
}

.contact-icon {
  font-size: 2rem;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #9333EA, #7C3AED);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-method-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.9);
}

.contact-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.contact-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #9333EA, transparent);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.contact-link:hover {
  color: #9333EA;
}

.contact-link:hover::after {
  transform: scaleX(1);
}

/* Добавляем стили для фотографии в About.vue */
.profile-photo {
  border: 2px solid transparent;
  background: 
    linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box,
    linear-gradient(120deg, #9D5BD2, rgba(157, 91, 210, 0.3)) border-box;
  animation: borderGlow 4s ease-in-out infinite;
}

@keyframes borderGlow {
  0%, 100% { border-color: rgba(157, 91, 210, 0.3); }
  50% { border-color: rgba(157, 91, 210, 0.6); }
}

/* Стили для фиксированной навигации */
.nav {
  position: fixed;
  top: 100px;
  left: 0;
  width: 400px;
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

.nav-link {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  text-decoration: none;
  color: var(--white-muted);
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}
</style>
  