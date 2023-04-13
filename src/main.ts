import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
const app = createApp(App);
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
app.use(router)
app.mount('#app')
