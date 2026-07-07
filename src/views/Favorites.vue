<template>
  <div class="page">
    <div v-if="favStore.count === 0" class="empty-state">
      <div class="empty-icon">❤️</div>
      <p>还没有收藏景点</p>
      <p style="font-size:12px;margin-top:4px">在景点详情页点击 🤍 即可收藏</p>
      <router-link to="/spots" class="btn btn-primary" style="margin-top:16px">去看看景点</router-link>
    </div>

    <div v-else class="fav-list">
      <div v-for="item in favStore.favorites" :key="item.id" class="fav-item">
        <img class="fav-item-img" :src="item.coverImage" :alt="item.name" @click="$router.push(`/spots/${item.id}`)" />
        <div class="fav-item-body" @click="$router.push(`/spots/${item.id}`)">
          <div class="fav-item-name">{{ item.name }}</div>
          <div class="fav-item-meta">★ {{ item.rating }} · {{ item.district }} · {{ item.category }}</div>
        </div>
        <div class="fav-item-remove" @click="remove(item.id)">🗑️</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFavoriteStore } from "../stores/favorite.js"

const favStore = useFavoriteStore()

function remove(id) {
  favStore.remove(id)
}
</script>
