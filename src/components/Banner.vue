<template>
  <div class="banner">
    <div class="banner-track" :style="{ transform: `translateX(-${current * 100}%)` }">
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="banner-slide"
        :style="{ background: `linear-gradient(135deg, ${slide.color1}, ${slide.color2})` }"
      >
        <div>
          <div style="font-size:13px;font-weight:400;opacity:0.9;margin-bottom:4px">{{ slide.subtitle }}</div>
          <div>{{ slide.title }}</div>
        </div>
      </div>
    </div>
    <div class="banner-dots">
      <span
        v-for="(_, i) in slides"
        :key="i"
        class="banner-dot"
        :class="{ active: i === current }"
        @click="current = i"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

defineProps({
  slides: { type: Array, default: () => [] }
})

const current = ref(0)
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    const len = 3
    current.value = (current.value + 1) % len
  }, 4000)
})

onUnmounted(() => clearInterval(timer))
</script>
