import { spots as allSpots } from './mockData.js'

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms))

export async function getSpots({ page = 1, pageSize = 6, search = '', district = '', category = '', sort = 'popularity' } = {}) {
  await delay(150)
  let list = [...allSpots]

  if (search) {
    const kw = search.toLowerCase()
    list = list.filter(s =>
      s.name.toLowerCase().includes(kw) ||
      s.alias.toLowerCase().includes(kw) ||
      s.tags.some(t => t.toLowerCase().includes(kw))
    )
  }
  if (district) list = list.filter(s => s.district === district)
  if (category) list = list.filter(s => s.category === category)

  if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
  else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'zh'))
  else list.sort((a, b) => b.popularity - a.popularity)

  const total = list.length
  const start = (page - 1) * pageSize
  const data = list.slice(start, start + pageSize)

  return { data, total, page, pageSize, hasMore: start + pageSize < total }
}

export async function getSpotById(id) {
  await delay(100)
  const spot = allSpots.find(s => s.id === Number(id))
  if (!spot) throw new Error('景点未找到')
  const nearby = allSpots
    .filter(s => s.id !== spot.id && s.district === spot.district)
    .slice(0, 4)
  return { ...spot, nearby }
}

export async function getRecommendedSpots() {
  await delay(100)
  return allSpots.filter(s => s.isRecommended).slice(0, 8)
}

export async function getDailyPick() {
  await delay(100)
  const picks = allSpots.filter(s => s.isRecommended)
  return picks[Math.floor(Math.random() * picks.length)]
}

export async function getDistricts() {
  await delay(50)
  const map = {}
  allSpots.forEach(s => { map[s.district] = (map[s.district] || 0) + 1 })
  return Object.entries(map).map(([name, count]) => ({ name, count }))
}

export async function searchSpots(keyword) {
  await delay(150)
  if (!keyword.trim()) return []
  const kw = keyword.toLowerCase()
  return allSpots
    .filter(s => s.name.toLowerCase().includes(kw) || s.tags.some(t => t.toLowerCase().includes(kw)))
    .map(s => ({ id: s.id, name: s.name, coverImage: s.coverImage, rating: s.rating }))
}
