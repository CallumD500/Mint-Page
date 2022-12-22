<template>  
  <main>
    <div class="flex w-full h-screen flex-1 bg-neutral-900 justify-center">
      <div class="max-w-4xl">
        <p class="text-emerald-500 font-bold text-7xl mt-10 text-center">MINT NOW</p>
        <p class="text-white font-thin text-2xl mt-4 text-center">Your incentive to meet is astounding and I want nothing more than to see the day you mint this wonderful nft</p>
        <div class="grid grid-cols-2 justify-items-center mt-24">
          <Uploader />
          <Minter />
          <DeleteModal />
        </div>
     </div>
   </div>
  </main>
</template>

<script setup>

import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid';
import { useMintStore } from '../stores/mint';
import { computed } from 'vue'
import QuantitySelector from '../components/QuantitySelector.vue'
import Minter from '../components/Minter.vue'
import Uploader from '../components/Uploader.vue';
import DeleteModal from '../components/DeleteModal.vue';

const mintStore = useMintStore()

const poverty = computed(() => mintStore.balance < mintStore.total)

</script>
