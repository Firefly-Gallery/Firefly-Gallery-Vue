import { fileURLToPath, URL } from 'node:url'

import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer';

const prefix = "firefly"
const assetFile = `${prefix}.[name].[hash].[ext]`

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
  assetsInclude: ["**/*.lrc", "**/*.avif", "**/*.webp", "src/**/*.html"],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      external: [
        // "vue",
        // "vue-router",
        // "aplayer",
      ],
      output: {
        entryFileNames: `js/${prefix}.[hash].js`,
        chunkFileNames: `js/${prefix}.[name].[hash].js`,
        assetFileNames(meta) {
          if(meta.name.endsWith(".css")) {
            return `css/${assetFile}`
          }
          if(['.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.gif'].some(ext => meta.name.endsWith(ext))) {
            return `images/${assetFile}`
          }
          return `assets/${assetFile}`
        },
        paths: {
          // aplayer: 'https://cdn.staticfile.net/aplayer/1.10.1/APlayer.min.js',
          // "vue": 'https://cdn.staticfile.net/vue/3.3.4/vue.runtime.esm-browser.js',
          // "vue-router": 'https://cdn.staticfile.net/vue-router/4.2.5/vue-router.esm-browser.js'
        },
      }
    }
  }
})
