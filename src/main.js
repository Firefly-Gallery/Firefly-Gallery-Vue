import { createApp } from 'vue';
import App from './App.vue';
import router from "./navigations/router.js";
import './styles/main.css';
import components from './data/components.js'

const app = createApp(App);

app.use(router);
app.use(components);

app.mount('#app');
