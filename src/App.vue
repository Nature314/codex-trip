<template>
  <router-view v-slot="{ Component, route }">
    <div v-if="route.meta.showTab !== false">
      <component :is="Component" />
      <TabBar />
    </div>
    <component v-else :is="Component" />
  </router-view>
  <div v-if="toast" class="toast">{{ toast }}</div>
</template>

<script setup>
import { ref, provide } from "vue"
import TabBar from "./components/TabBar.vue"

const toast = ref("")
provide("toast", (msg) => {
  toast.value = msg
  setTimeout(() => { toast.value = "" }, 2000)
})
</script>
