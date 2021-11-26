import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Anuncio from "../views/Anuncio.vue"
import Estadisticas from "../views/Estadisticas.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/anuncio/:id',
    name: 'Anuncio',
    component: Anuncio
  },

  {
    path: '/Estadisticas',
    name: 'Estadisticas',
    component: Estadisticas
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
