import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdDeleteOutlined } from 'oh-vue-icons/icons/md';
import { BiXCircle } from 'oh-vue-icons/icons';
import './style.css';

addIcons(MdDeleteOutlined, BiXCircle);

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(PrimeVue);

// Регистрируем компонент-обёртку
app.component('v-icon', OhVueIcon);

app.mount('#app');
