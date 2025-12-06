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
  },
  {
    path: '/login',
    name: 'Log in',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/ContactUs',
    name: 'Contact us',
    component: () => import('@/views/ContactUsView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
