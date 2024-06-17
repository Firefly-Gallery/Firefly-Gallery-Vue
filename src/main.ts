import { createApp } from 'vue';
import App from '@/App.vue';
import router from "@/navigations/router";
import '@/styles/main.css';

import VueMasonry from 'vue-next-masonry'


console.log(import.meta.env.MODE)

const app = createApp(App);

// Register vue router

app.use(router);

// Register vue masonry layout

app.use(VueMasonry);

app.mount('#app');
