<template>
  <div class="page">
    <!-- 搜索栏 -->
    <div style="padding:12px 0 4px">
      <SearchBar v-model="searchText" placeholder="搜索景点名称或关键词..." />
    </div>

    <!-- 筛选 -->
    <div class="filter-bar">
      <div
        class="filter-chip"
        :class="{ active: !filterDistrict && !filterCategory }"
        @click="clearFilters"
      >全部</div>
      <div
        v-for="d in allDistricts"
        :key="d"
        class="filter-chip"
        :class="{ active: filterDistrict === d }"
        @click="toggleDistrict(d)"
      >{{ d }}</div>
      <div
        v-for="c in categories"
        :key="c"
        class="filter-chip"
        :class="{ active: filterCategory === c }"
        @click="toggleCategory(c)"
      >{{ c }}</div>
    </div>

    <!-- 排序 -->
    <div class="sort-bar">
      <div
        v-for="s in sortOptions"
        :key="s.key"
        class="sort-btn"
        :class="{ active: sortKey === s.key }"
        @click="sortKey = s.key"
      >{{ s.label }}</div>
    </div>

    <!-- 列表 -->
    <div class="spot-grid">
      <SpotCard v-for="spot in spots" :key="spot.id" :spot="spot" />
    </div>

    <div v-if="loading" class="load-more">加载中...</div>
    <div v-else-if="spots.length === 0" class="empty-state">
      <div class="empty-icon">🔍</div>
      <p>没有找到匹配的景点</p>
    </div>
    <div v-else-if="hasMore" class="load-more">
      <button class="btn btn-outline" @click="loadMore">加载更多</button>
    </div>
    <div v-else class="load-more">— 已显示全部 {{ total }} 个景点 —</div>
    <div style="height:16px"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import { useRoute } from "vue-router"
import SearchBar from "../components/SearchBar.vue"
import SpotCard from "../components/SpotCard.vue"
import { getSpots } from "../api/spots.js"
import { districts as districtList } from "../api/mockData.js"

const route = useRoute()

const spots = ref([])
const loading = ref(false)
const hasMore = ref(true)
const total = ref(0)
const page = ref(1)
const searchText = ref("")
const filterDistrict = ref("")
const filterCategory = ref("")
const sortKey = ref("popularity")

const allDistricts = ["秦淮区", "玄武区", "鼓楼区", "建邺区", "栖霞区", "雨花台区", "江宁区"]
const categories = ["历史人文", "自然风光", "宗教寺庙", "博物馆"]
const sortOptions = [
  { key: "popularity", label: "热门" },
  { key: "rating", label: "评分" },
  { key: "name", label: "名称" }
]

function toggleDistrict(d) {
  filterDistrict.value = filterDistrict.value === d ? "" : d
  page.value = 1
}

function toggleCategory(c) {
  filterCategory.value = filterCategory.value === c ? "" : c
  page.value = 1
}

function clearFilters() {
  filterDistrict.value = ""
  filterCategory.value = ""
  page.value = 1
}

async function fetchData() {
  loading.value = true
  const res = await getSpots({
    page: page.value,
    pageSize: 6,
    search: searchText.value,
    district: filterDistrict.value,
    category: filterCategory.value,
    sort: sortKey.value
  })
  spots.value = page.value === 1 ? res.data : [...spots.value, ...res.data]
  total.value = res.total
  hasMore.value = res.hasMore
  loading.value = false
}

function loadMore() {
  page.value++
  fetchData()
}

// 监听筛选条件变化
watch([searchText, filterDistrict, filterCategory, sortKey], () => {
  page.value = 1
  fetchData()
})

onMounted(() => {
  // 从首页区域入口跳转过来时携带 district 参数
  if (route.query.district) {
    filterDistrict.value = route.query.district
  }
  fetchData()
})
</script>
