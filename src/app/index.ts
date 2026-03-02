import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps'
import { RegleVuePlugin } from '@regle/core'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
const apiKey = import.meta.env.VITE_MAPS_KEY

const pinia = createPinia()

app.use(
  createYmaps({
    apikey: apiKey,
    version: '3.0',
    lang: 'ru_RU'
  })
)
app.use(RegleVuePlugin)

app.use(pinia)
app.use(router)

export { app }
