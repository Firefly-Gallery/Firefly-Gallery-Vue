import { createApp } from 'vue';
import App from '@/App.vue';
import router from "@/navigations/router";
import '@/styles/main.css';

import VueMasonry from 'vue-next-masonry'

import CustomScrollbar from 'custom-vue-scrollbar';
import 'custom-vue-scrollbar/dist/style.css';

console.log(import.meta.env.MODE)

const app = createApp(App);

// Register vue router

app.use(router);

// Register vue masonry layout

app.use(VueMasonry);

// Register Custom Scrollbar

declare module 'vue' {
  export interface GlobalComponents {
    CustomScrollbar: typeof CustomScrollbar;
  }
}

app.component("custom-scrollbar", CustomScrollbar)


app.mount('#app');
