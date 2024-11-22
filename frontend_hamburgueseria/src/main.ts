import '@/assets/vendor/fontawesome-free/css/all.min.css';
import '@/assets/css/sb-admin-2.min.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue';
import router from './router';

const app = createApp(App)
library.add(faPlus, faEdit, faTrash, faSave)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')




import "bootstrap/dist/js/bootstrap.min.js";
import '@/assets/vendor/jquery/jquery.min.js';

import '@/assets/vendor/bootstrap/js/bootstrap.bundle.min.js';