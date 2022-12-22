import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMintStore = defineStore('mint', () => {
  const quantity = ref(1)
  const max = ref(10)
  const balance = ref(0.04)
  const price = ref(0.02)
  const total = computed(() => quantity.value * price.value)
  function increment() {
    if (quantity.value < max.value) {
    quantity.value++
    }
  }
  function decrement() {
    if (quantity.value > 0) {
      quantity.value--
    } 
  }

  return { quantity, price, max, total, balance, decrement, increment }
})
