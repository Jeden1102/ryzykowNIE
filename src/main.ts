import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { createPinia } from 'pinia'

import router from './router'
const app = createApp(App).use(createPinia());

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

app.use(router)
app.mount('#app')
