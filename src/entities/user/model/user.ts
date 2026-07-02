import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, type Ref } from 'vue'

export interface User {
  id: string
  email?: string
  phone?: string
  name: string | null
  address: string | null
  token: string
}

interface UserStore {
  isUserAuth: Ref<boolean>
  userName: Ref<string>

  setUser: (userData: User) => void
  resetUser: () => void
  getToken: () => string | undefined
}

export const useUserStore = defineStore('useUserStore', (): UserStore => {
  const user = useStorage<User | null>('shop-user', null, localStorage, {
    serializer: {
      read(raw) {
        return raw ? JSON.parse(raw) : null
      },
      write(value) {
        return value ? JSON.stringify(value) : ''
      }
    }
  })

  const isUserAuth: UserStore['isUserAuth'] = computed(() => !!user.value)

  const userName: UserStore['userName'] = computed(
    () => user.value?.name ?? user.value?.phone ?? 'Войти'
  )

  const setUser: UserStore['setUser'] = (userData) => {
    user.value = userData
  }

  const resetUser: UserStore['resetUser'] = () => {
    user.value = null
  }

  const getToken: UserStore['getToken'] = () => {
    return user.value?.token
  }

  return {
    isUserAuth,
    userName,
    setUser,
    resetUser,
    getToken
  }
})
