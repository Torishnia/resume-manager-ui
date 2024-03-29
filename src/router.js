import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('./views/CreateResume.vue')
  },
  {
    path: '/view/:id',
    name: 'view',
    component: () => import('./views/ViewResume.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
