import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './app/App.vue'
import router from './app/router'

const app = createApp(App)
const apiKey = import.meta.env.VITE_MAPS_KEY

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(
  createYmaps({
    apikey: apiKey,
    version: '3.0',
    lang: 'ru_RU',
  }),
)

app.use(pinia)
app.use(router)
app.mount('#app')
