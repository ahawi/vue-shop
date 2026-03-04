import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)

const pinia = createPinia()

app.use(
  createYmaps({
    apikey: import.meta.env.VITE_MAPS_KEY,
    lang: 'ru_RU'
  })
)

app.use(pinia)
app.use(router)

export { app }
