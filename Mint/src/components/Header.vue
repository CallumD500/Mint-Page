<template>
  <header class="py-10">
    <nav class="relative z-50 flex justify-between">
      <div class="flex items-center md:gap-x-12">
        <div class="hidden lg:flex md:gap-x-6">
          <AppLink v-for="(item, idx) in nav" :key="idx" :to="item.href"></AppLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>

import AppLink from '../components/AppLink.vue'
import { RouterLink, useLink } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const nav = [
  {
    name: 'Home',
    href: { name: 'HomeView'},
  },
  {
    name: 'About',
    href: { name: 'AboutView'},
  },
]
</script>