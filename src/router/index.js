import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页', showTab: true }
  },
  {
    path: '/spots',
    name: 'SpotList',
    component: () => import('../views/SpotList.vue'),
    meta: { title: '景点', showTab: true }
  },
  {
    path: '/spots/:id',
    name: 'SpotDetail',
    component: () => import('../views/SpotDetail.vue'),
    meta: { title: '景点详情', showTab: false }
  },
  {
    path: '/tips',
    name: 'Tips',
    component: () => import('../views/Tips.vue'),
    meta: { title: '贴士', showTab: true }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/Favorites.vue'),
    meta: { title: '收藏', showTab: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
