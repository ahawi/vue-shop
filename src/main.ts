import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps'

import App from './app/App.vue'
import router from './app/router'

const app = createApp(App)

app.use(
  createYmaps({
    apikey: '9f4f50cc-22b5-4a09-baec-7031c9c81673',
    version: '3.0',
    lang: 'ru_RU',
  }),
)

app.use(createPinia())
app.use(router)

app.mount('#app')
