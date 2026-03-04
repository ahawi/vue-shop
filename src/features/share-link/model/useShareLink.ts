import { ref } from 'vue'

export const useShareLink = () => {
  const isCopied = ref(false)

  const copyLink = async (url: string) => {
    await navigator.clipboard.writeText(url)
    isCopied.value = true
    setTimeout(() => (isCopied.value = false), 2000)
  }

  return { isCopied, copyLink }
}
