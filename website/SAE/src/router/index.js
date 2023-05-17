import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexVue.vue'
import RegisterVue from '../views/RegisterVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterVue
    }
  ]
})

export default router
