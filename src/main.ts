import { app, startMockServer } from '@/app'

if (import.meta.env.DEV) {
  await startMockServer()
}

app.mount('#app')
