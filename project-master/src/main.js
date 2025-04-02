import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import store from './store/store'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


const app = createApp(App);
//const cors = require('cors');
app.use(router);
app.use(store);
//app.use(cors());
app.mount('#app');

