<template>
    <div class="relative mt-1">
    <div class="flex flex-1 items-center gap-x-3">
      <div @click="mintStore.decrement" class="border-2 border-emerald-500 select-none hover:bg-emerald-500 cursor-pointer px-4 py-2 rounded-lg text-white">-</div>
      <div>
        <input type="text" name="email" id="email" :value="mintStore.quantity" class="text-right bg-transparent px-2 py-2 block w-full rounded-md border-2 text-neutral-600 border-neutral-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" disabled />
      </div>
      <div @click="mintStore.increment" class="border-2 border-emerald-500 select-none px-4 py-2 rounded-lg text-white hover:bg-emerald-500 cursor-pointer">+</div>
    </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

import { useMintStore } from '../stores/mint'

const mintStore = useMintStore()

const poverty = computed(() => mintStore.balance < mintStore.total)

</script>