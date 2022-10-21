import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    lib: {
      name: 'vue-cf-ui',
      entry: fileURLToPath(new URL('./src/components/index.js', import.meta.url)),
      fileName: (format) => `vue-cf-ui.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()]
})