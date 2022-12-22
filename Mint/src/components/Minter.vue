<template>
  <div class="w-full px-2">
    <div class="px-6 bg-neutral-800 w-full rounded-lg py-6">
      <div class="flex flex-col flex-1 items-center">
        <p class="text-emerald-500 text-lg b">Mint it!</p>
      </div>
      <div class="">
        <div class="grid grid-cols-1 justify-between items-center">
          <div class="mt-10 flex space-between items-center">
            <p class="text-xl text-neutral-400">Price</p>
            <p class="text-right bg-transparent py-2 block w-full rounded-md border-2 text-neutral-400 border-transparent shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-xl">{{ mintStore.price }} ETH</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-xl text-neutral-400">Balance</p>
            <p class="text-right bg-transparent py-2 block w-full rounded-md border-2 text-neutral-400 border-transparent shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-xl">{{ mintStore.balance }} ETH</p>
          </div>
          <div class="mt-8 flex justify-between items-center">
            <p class="text-xl text-neutral-400">Quantity</p>
            <QuantitySelector class="w-1/2" />
          </div>
          <div class="mt-10 flex justify-between items-center relative">
            <p class="text-xl text-neutral-400">Total</p>
            <input type="text" name="email" id="email" :value="mintStore.total" class="w-1/2 text-right bg-transparent px-10 py-1 block rounded-md border-2 text-neutral-600 border-neutral-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-xl" disabled />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <CheckCircleIcon v-if="!poverty" class="h-5 w-5 text-emerald-500" aria-hidden="true" />
              <ExclamationCircleIcon v-else class="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
          </div>
        </div>
        <p class="text-white">{{ walletAddress }}</p>
        <div class="flex flex-1 justify-center items-center">
          <div class="flex flex-1">
            <button :class="[ connected ? 'hover:bg-emerald-500 border-emerald-500' : 'border-neutral-700 cursor-not-allowed disabled', 'px-10 py-2 rounded-lg text-white border-2 mt-6']">Mint</button>
          </div>
          <div v-if="!connected" class="flex flex-1">
            <button @click="connectWallet" class="px-10 py-2 border-sky-500 border-2 rounded-lg text-white hover:bg-sky-500 mt-6">Connect</button>
          </div>
          <div v-else class="flex flex-1">
            <button @click="disconnectWallet" class="px-10 py-2 border-red-500 border-2 rounded-lg text-white hover:bg-red-500 mt-6">Disconnect</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { computed, onBeforeMount, onMounted, onUpdated, ref, watch, watchEffect } from 'vue'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid';
import QuantitySelector from './QuantitySelector.vue'
import { useMintStore } from '../stores/mint'
import { useConnectWallet } from '../utils/interact'
import { useWalletStore } from '../stores/wallet';

const mintStore = useMintStore()
const walletStore = useWalletStore()
const poverty = computed(() => mintStore.balance < mintStore.total)

const walletAddress = ref('')
const status = ref('')

// Connect Wallet

const { address, status:message, startConnection, getCurrentWallet, disconnect, connected } = useConnectWallet()

onMounted(() => {
  getCurrentWallet()
})

watchEffect(() => {
  walletAddress.value = address.value
  status.value = message.value
  addWalletListener()
})

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        walletAddress.value = accounts[0];
        status.value = 'Changed successfully'
      } else {
        walletAddress.value = ''
        status.value = 'Connect to MetaMask'
      }
    })
  }
}

const disconnectWallet = async () => {
  disconnect()
}

const connectWallet = async () => {
  startConnection()
};



</script>