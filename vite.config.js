import { fileURLToPath, URL } from 'node:url'

import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    splitVendorChunkPlugin(),
    visualizer({
      emitFile: false,
      filename: 'analysis-chart.html',
      open: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  assetsInclude: ["**/*.lrc", "**/*.avif", "**/*.webp"],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      external: [
        // "vue",
        // "vue-router",
        // "aplayer",
      ],
      output: {
        paths: {
          // aplayer: 'https://cdn.staticfile.net/aplayer/1.10.1/APlayer.min.js',
          // "vue": 'https://cdn.staticfile.net/vue/3.3.4/vue.runtime.esm-browser.js',
          // "vue-router": 'https://cdn.staticfile.net/vue-router/4.2.5/vue-router.esm-browser.js'
        },
      }
    }
  }
})
