import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import { VueCookies } from 'vue3-cookies/dist/interfaces';

const app = createApp(App)

app.use(router)

app.use(createVuestic())

app.use(VueCookies, {
    expireTimes: "15min",
    secure: true,
})

app.mount('#app')
