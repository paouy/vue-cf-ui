const path = require('path')
const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

export default defineConfig({
  build: {
    lib: {
      name: 'vue-cf-ui',
      entry: path.resolve(__dirname, 'src/components/index.js'),
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