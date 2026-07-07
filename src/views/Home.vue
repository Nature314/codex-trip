<template>
  <div class="page">
    <!-- Banner -->
    <Banner :slides="bannerSlides" />

    <!-- 热门景点 -->
    <div class="section-title">
      <span>🔥 热门景点</span>
      <router-link to="/spots" class="more">查看全部 →</router-link>
    </div>
    <div class="h-scroll">
      <div
        v-for="spot in hotSpots"
        :key="spot.id"
        style="width:200px"
      >
        <SpotCard :spot="spot" />
      </div>
    </div>

    <!-- 按区域浏览 -->
    <div class="section-title">
      <span>📍 按区域浏览</span>
    </div>
    <div class="district-grid">
      <div
        v-for="d in districts"
        :key="d.name"
        class="district-entry"
        @click="goToDistrict(d.name)"
      >
        <span class="district-icon">{{ districtIcons[d.name] || "🏛️" }}</span>
        <div>
          <div class="district-name">{{ d.name }}</div>
          <div class="district-count">{{ d.count }} 个景点</div>
        </div>
      </div>
    </div>

    <!-- 今日推荐 -->
    <div class="section-title">
      <span>⭐ 今日推荐</span>
    </div>
    <div v-if="dailyPick" class="daily-pick" @click="$router.push(`/spots/${dailyPick.id}`)">
      <img class="daily-pick-img" :src="dailyPick.coverImage" :alt="dailyPick.name" />
      <div class="daily-pick-body">
        <div class="daily-label">✨ 编辑精选</div>
        <h3>{{ dailyPick.name }}</h3>
        <p>{{ dailyPick.description }}</p>
        <div style="display:flex;gap:6px;margin-top:8px">
          <span class="tag">{{ dailyPick.district }}</span>
          <span class="tag">{{ dailyPick.category }}</span>
          <span class="tag" style="color:#FF6B35;background:#FFF3ED">★ {{ dailyPick.rating }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import Banner from "../components/Banner.vue"
import SpotCard from "../components/SpotCard.vue"
import { getRecommendedSpots, getDailyPick, getDistricts } from "../api/spots.js"

const router = useRouter()
const hotSpots = ref([])
const dailyPick = ref(null)
const districts = ref([])

const districtIcons = {
  "秦淮区": "🏯",
  "玄武区": "🌲",
  "鼓楼区": "🏛️",
  "建邺区": "🌊",
  "栖霞区": "🍁",
  "雨花台区": "🪨",
  "江宁区": "⛰️"
}

const bannerSlides = [
  { title: "六朝古都，金陵风华", subtitle: "南京欢迎你", color1: "#2B7A4B", color2: "#1E5D35" },
  { title: "烟雨秦淮，桨声灯影", subtitle: "夫子庙-秦淮河", color1: "#D4380D", color2: "#8C2D0B" },
  { title: "钟山龙蟠，石城虎踞", subtitle: "紫金山-中山陵", color1: "#0050B3", color2: "#00307A" }
]

function goToDistrict(name) {
  router.push({ path: "/spots", query: { district: name } })
}

onMounted(async () => {
  hotSpots.value = await getRecommendedSpots()
  dailyPick.value = await getDailyPick()
  districts.value = await getDistricts()
})
</script>
