<template>
  <div class="page">

    <!-- 最佳季节 -->
    <div class="tip-card">
      <h2>🌤️ {{ tips.bestSeason?.title }}</h2>
      <p>{{ tips.bestSeason?.description }}</p>
      <div class="tip-season-grid">
        <div v-for="s in tips.bestSeason?.seasons" :key="s.name" class="tip-season-item">
          <div class="season-name">{{ s.name }}</div>
          <div class="season-detail">{{ s.weather }} · {{ s.highlights }}</div>
          <div style="font-size:11px;margin-top:2px">{{ s.rating }}</div>
        </div>
      </div>
    </div>

    <!-- 游玩路线 -->
    <div class="tip-card">
      <h2>🗺️ 推荐游玩路线</h2>
      <div v-for="(route, i) in tips.routes" :key="i" class="tip-route">
        <h3>{{ route.title }} <span class="route-duration">({{ route.duration }})</span></h3>
        <ol>
          <li v-for="(item, j) in route.schedule" :key="j">{{ item }}</li>
        </ol>
        <div class="route-tip">💡 {{ route.tip }}</div>
      </div>
    </div>

    <!-- 美食推荐 -->
    <div class="tip-card">
      <h2>🍜 本地美食推荐</h2>
      <div v-for="(food, i) in tips.foods" :key="i" class="food-item">
        <div class="food-name">{{ food.name }}</div>
        <div class="food-desc">{{ food.description }}</div>
        <div class="food-place">📍 {{ food.place }}</div>
      </div>
    </div>

    <!-- 住宿建议 -->
    <div class="tip-card">
      <h2>🏨 住宿建议</h2>
      <div v-for="(hotel, i) in tips.accommodations" :key="i" class="hotel-item">
        <div class="hotel-name">{{ hotel.district }}</div>
        <div class="hotel-desc">{{ hotel.description }}</div>
        <div class="hotel-price">{{ hotel.price }}</div>
      </div>
    </div>

    <div style="height:16px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getTips } from "../api/tips.js"

const tips = ref({
  bestSeason: { seasons: [] },
  routes: [],
  foods: [],
  accommodations: []
})

onMounted(async () => {
  tips.value = await getTips()
})
</script>
