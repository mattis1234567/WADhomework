import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/addpost',
    name: 'Add post',
    component: () => import('@/views/AddPostView.vue')
  },
  {
    path: '/signup',
    name: 'Sign up',
    component: () => import('@/views/SignUpView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
