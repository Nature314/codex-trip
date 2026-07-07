<template>
  <router-link :to="`/spots/${spot.id}`" class="spot-card">
    <img class="spot-card-img" :src="spot.coverImage" :alt="spot.name" />
    <div class="spot-card-body">
      <div class="spot-card-title">
        <span>{{ spot.name }}</span>
        <span class="spot-card-rating">★ {{ spot.rating }}</span>
      </div>
      <div class="spot-card-meta">
        <span>{{ spot.district }}</span>
        <span>{{ spot.category }}</span>
      </div>
      <div class="spot-card-desc">{{ spot.description }}</div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({ spot: { type: Object, required: true } })
</script>
