import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import store from './store/store'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


const app = createApp(App);

// Usa tanto el enrutador como el almacenamiento Vuex en la aplicación
app.use(router);
app.use(store);
app.mount('#app');

