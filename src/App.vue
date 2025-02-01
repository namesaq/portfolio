<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>
/* Сбрасываем отступы и делаем box-sizing */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Гарантируем, что html и body занимают всю высоту */
html, body {
  min-height: 100vh;
  width: 100%;
  background-color: #1A1A1A;
  color: #F5F5F5;
  font-family: Arial, sans-serif;
  
  /* Скрываем скролл но оставляем функциональность */
  -ms-overflow-style: none;  /* IE и Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Скрываем скролл в Chrome, Safari и Opera */
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
}

/* #app теперь адаптируется под контент */
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1A1A1A;
  
  /* Скрываем скролл но оставляем функциональность */
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Скрываем скролл в Chrome, Safari и Opera */
#app::-webkit-scrollbar {
  display: none;
}

/* Позволяем контенту прокручиваться */
#app, body {
  overflow-x: hidden;
  overflow-y: auto;
}

/* Глобально скрываем все скроллбары */
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

*::-webkit-scrollbar {
  display: none;
}

:root {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

/* Стили для Chrome/Safari/Edge */
::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

body {
  -ms-overflow-style: none;  /* IE и Edge */
  scrollbar-width: none;  /* Firefox */
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  background: var(--bg-primary);
}
</style>
