import { createApp } from 'vue';
import App from '@/App.vue';
import router from "@/navigations/router";
import '@/styles/main.css';
import VueMasonry from 'vue-next-masonry'

const app = createApp(App);

app.use(router);
app.use(VueMasonry);

app.mount('#app');
