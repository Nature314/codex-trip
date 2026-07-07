<template>
  <nav class="tab-bar">
    <router-link v-for="tab in tabs" :key="tab.path" :to="tab.path" class="tab-item" :class="{ active: isActive(tab.path) }">
      <span class="tab-icon">{{ tab.icon }}</span>
      <span>{{ tab.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router"

const route = useRoute()

const tabs = [
  { path: "/home", icon: "🏠", label: "首页" },
  { path: "/spots", icon: "🗺️", label: "景点" },
  { path: "/tips", icon: "💡", label: "贴士" },
  { path: "/favorites", icon: "❤️", label: "收藏" }
]

function isActive(path) {
  if (path === "/home") return route.path === "/home" || route.path === "/"
  if (path === "/spots") return route.path.startsWith("/spots")
  return route.path === path
}
</script>
