<template>
  <div>
    <!-- 顶部 -->
    <div class="detail-hero">
      <img :src="spot.coverImage" :alt="spot.name" />
      <div class="detail-hero-overlay"></div>
      <div class="detail-hero-back" @click="$router.back()">←</div>
      <div class="detail-hero-fav" @click="toggleFav">
        {{ isFav ? "❤️" : "🤍" }}
      </div>
      <div class="detail-hero-info">
        <h1>{{ spot.name }}</h1>
        <div class="detail-en">{{ spot.alias }}</div>
      </div>
    </div>

    <!-- 基本信息 -->
    <div style="margin-top:-12px">
      <div class="detail-section">
        <div class="detail-info-grid">
          <div class="detail-info-item">
            <label>评分</label>
            <span style="color:#FF6B35">★ {{ spot.rating }} ({{ (spot.ratingCount / 1000).toFixed(1) }}k)</span>
          </div>
          <div class="detail-info-item">
            <label>类别</label>
            <span>{{ spot.category }}</span>
          </div>
          <div class="detail-info-item">
            <label>开放时间</label>
            <span>{{ spot.openingHours }}</span>
          </div>
          <div class="detail-info-item">
            <label>门票</label>
            <span style="color:var(--primary);font-weight:600">{{ spot.ticketPrice }}</span>
          </div>
          <div class="detail-info-item">
            <label>建议游玩</label>
            <span>{{ spot.suggestedDuration }}</span>
          </div>
          <div class="detail-info-item">
            <label>最佳季节</label>
            <span>{{ spot.bestSeason }}</span>
          </div>
        </div>
      </div>

      <!-- 简介 -->
      <div class="detail-section">
        <h2>📖 景点简介</h2>
        <p class="detail-desc">{{ spot.description }}</p>
        <div class="detail-tags">
          <span v-for="tag in spot.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <!-- 历史背景 -->
      <div class="detail-section">
        <h2>📜 历史背景</h2>
        <p class="detail-desc">{{ spot.history }}</p>
      </div>

      <!-- 交通指南 -->
      <div class="detail-section">
        <h2>🚇 交通指南</h2>
        <div style="margin-bottom:8px">
          <div style="font-size:13px;font-weight:600">地铁</div>
          <p class="detail-desc">{{ spot.subway }}</p>
        </div>
        <div>
          <div style="font-size:13px;font-weight:600">公交</div>
          <p class="detail-desc">{{ spot.bus }}</p>
        </div>
        <div style="margin-top:8px">
          <div style="font-size:13px;font-weight:600">地址</div>
          <p class="detail-desc">{{ spot.address }}</p>
        </div>
      </div>

      <!-- 图片画廊 -->
      <div v-if="spot.images && spot.images.length > 1" class="detail-section">
        <h2>🖼️ 精彩图片</h2>
        <div class="gallery-scroll">
          <img v-for="(img, i) in spot.images" :key="i" :src="img" :alt="`${spot.name} ${i + 1}`" />
        </div>
      </div>

      <!-- 周边推荐 -->
      <div v-if="spot.nearby && spot.nearby.length" class="detail-section">
        <h2>📍 周边推荐</h2>
        <div class="spot-grid" style="padding:0">
          <SpotCard v-for="s in spot.nearby" :key="s.id" :spot="s" />
        </div>
      </div>

      <div style="height:24px"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import SpotCard from "../components/SpotCard.vue"
import { getSpotById } from "../api/spots.js"
import { useFavoriteStore } from "../stores/favorite.js"

const route = useRoute()
const favStore = useFavoriteStore()
const spot = ref({})

const isFav = computed(() => favStore.isFavorited(spot.value.id))

function toggleFav() {
  if (spot.value.id) {
    favStore.toggle(spot.value)
  }
}

onMounted(async () => {
  spot.value = await getSpotById(route.params.id)
})
</script>
