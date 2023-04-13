import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import GamesList from '../views/GamesList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: GamesList
  },
  {
    path: '/add-game',
    name: 'addGame',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddGame.vue')
  },
  {
    path: '/add-question',
    name: 'addQuestion',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddQuestions.vue')
  },
  {
    path: '/join-game',
    name: 'joinGame',
    component: () => import(/* webpackChunkName: "about" */ '../views/JoinGame.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
