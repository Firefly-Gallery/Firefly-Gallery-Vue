import { createApp } from 'vue';
import App from '@/App.vue';
import router from "@/navigations/router";
import '@/styles/main.css';

const app = createApp(App);

app.use(router);
// app.use(components);

app.mount('#app');
