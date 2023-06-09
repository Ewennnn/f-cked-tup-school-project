import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexVue.vue'
import RegisterVue from '../views/RegisterVue.vue'
import MainVue from '../views/MainVue.vue'
import FavorisVue from '../views/FavorisVue.vue'
import DatesVue from '../views/DatesVue.vue'

const router = createRouter({
  mode: 'history',
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
    },
    {
      path: '/home',
      name: 'main',
      component: MainVue
    },
    {
      path: '/favoris',
      name: 'favoris',
      component: FavorisVue
    },
    {
      path: '/dates/:ville',
      name: 'dates',
      component: DatesVue
    }
  ]
})

export default router
