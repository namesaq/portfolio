import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true, // Слушаем все доступные сетевые интерфейсы
    port: 5173, // Порт по умолчанию
    strictPort: true, // Строгое использование порта
    // Настройки CORS для безопасности
    cors: true,
    // Дополнительные настройки для сети
    hmr: {
      clientPort: 5173
    }
  },
  base: '/portfolio/',
})
