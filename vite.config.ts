import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import pkg from './package.json'

const resolvePath = (path: string) => resolve(__dirname, path)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolvePath('src')
    }
  },
  build: {
    lib: {
      entry: resolvePath('src/index.ts'),
      name: 'GdtQRCode',
      formats: ['es', 'umd', 'iife'],
      fileName: (format) => `${pkg.name}.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
