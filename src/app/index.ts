import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import { handlers } from './mocks/index.ts'
import { createYmaps } from 'vue-yandex-maps'

const app = createApp(App)

const pinia = createPinia()

export async function startMockServer() {
  const { setupWorker } = await import('msw/browser')
  await setupWorker(...handlers).start({
    onUnhandledRequest: 'bypass'
  })
}

const mapsKey = import.meta.env.VITE_MAPS_KEY

if (mapsKey) {
  app.use(createYmaps({ apikey: mapsKey }))
}

app.use(pinia)
app.use(router)

export { app }
