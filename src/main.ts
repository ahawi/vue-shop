import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps'

import App from './app/App.vue'
import router from './app/router'

const app = createApp(App)
const apiKey = import.meta.env.VITE_MAPS_KEY

app.use(
  createYmaps({
    apikey: apiKey,
    version: '3.0',
    lang: 'ru_RU',
  }),
)

app.use(createPinia())
app.use(router)
app.mount('#app')
