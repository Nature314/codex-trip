import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'nj-trip-favorites'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref(load())

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
  }

  function isFavorited(id) {
    return favorites.value.some(f => f.id === id)
  }

  function toggle(spot) {
    const idx = favorites.value.findIndex(f => f.id === spot.id)
    if (idx > -1) {
      favorites.value.splice(idx, 1)
    } else {
      favorites.value.push({
        id: spot.id,
        name: spot.name,
        coverImage: spot.coverImage,
        rating: spot.rating,
        district: spot.district,
        category: spot.category
      })
    }
    save()
  }

  function remove(id) {
    favorites.value = favorites.value.filter(f => f.id !== id)
    save()
  }

  const count = computed(() => favorites.value.length)

  return { favorites, isFavorited, toggle, remove, count }
})
