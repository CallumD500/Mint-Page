import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('wallet', () => {

  const address = ref('')
  const status = ref('')

  return { address }
})
