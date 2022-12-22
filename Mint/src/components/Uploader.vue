<template>
  <div class="w-full px-2">
    <div class="px-6 bg-neutral-800 w-full h-full rounded-lg py-6 items-center">
      <div class="flex flex-col flex-1 items-center">
        <p class="text-emerald-500 text-lg">Upload it!</p>
      </div>
      <div class="grid grid-cols-1 justify-between items-center mt-14">
        <div class="flex justify-between items-center">
          <p class="text-xl text-neutral-400">Name</p>
          <input v-model="name" type="text" class="mt-2 bg-transparent px-2 py-1 block rounded-md border-2 text-neutral-300 placeholder-neutral-600 border-neutral-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-lg" placeholder="e.g. My first NFT!"/>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <p class="text-xl text-neutral-400">Asset link</p>
          <input v-model="url" type="text" placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>" class="mt-2 bg-transparent placeholder-neutral-600 px-2 py-1 block rounded-md border-2 text-neutral-300 border-neutral-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-lg"/>
        </div>
        <div class="mt-6 flex flex-col justify-between items-center">
          <p class="text-xl text-neutral-400">Description</p>
          <textarea v-model="description" type="text" class="mt-2 bg-transparent w-full px-2 py-1 block rounded-md border-2 text-neutral-300 placeholder-neutral-600 border-neutral-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-lg" placeholder="e.g. Even cooler than cryptokitties ;)" />
        </div>
      </div>
      <button @click="onMintPressed" class="bg-blue-500 rounded-lg px-6 py-2 mt-2">Upload</button>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import axios from 'axios'
import { mintNFT } from '../utils/interact'

const key = import.meta.env.VITE_PINATA_API_KEY
const secret = import.meta.env.VITE_PINATA_API_KEY_SECRET
const pinataUrl = import.meta.env.VITE_PINATA_URL

const name = ref('')
const description = ref('')
const url = ref('')

const onMintPressed = async () => {
    const { status } = await mintNFT(url.value, name.value, description.value);
    console.log(status)
};




</script>