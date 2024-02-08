import { createApp } from 'vue';
import App from './App.vue';
import router from "./navigations/router.js";
import './styles/main.css';
import smooth_scroll from './data/smooth_scroll.js'

const app = createApp(App);

app.use(router);
app.use(smooth_scroll);

app.mount('#app');
