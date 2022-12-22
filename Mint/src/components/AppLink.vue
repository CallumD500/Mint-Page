<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank" class="cursor-pointer">
    <slot :active="false" />
  </a>
  <router-link
    v-else
    v-bind="$props"
    custom
    active-class="text-red-500"
    class="cursor-pointer">
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="active ? activeClass : inactiveClass"
    >
      <slot :active="active" />
    </a>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useLink } from 'vue-router'

const props = defineProps({
  ...RouterLink.props,
  inactiveClass: String,
  exact: Boolean,
})

const activeClass = computed(() => 'text-red-500')

// `props` contains `to` and any other prop that can be passed to <router-link>
const { navigate, href, route, isActive, isExactActive } = useLink(props)
const isExternalLink = computed(() => typeof props.to === 'string' && props.to.startsWith('http'))
const active = computed(() => (!props.exact && isActive.value) || isExactActive.value)
</script>