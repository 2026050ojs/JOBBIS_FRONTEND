import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import QuestionsView from '../views/QuestionsView.vue'
import ResultView from '../views/ResultView.vue'
import LoginView from '../views/LoginView.vue'
import BackendStatusView from '../views/BackendStatusView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/questions',
      name: 'questions',
      component: QuestionsView,
    },
    {
      path: '/result',
      name: 'result',
      component: ResultView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/backend-status',
      name: 'backend-status',
      component: BackendStatusView,
    },
  ],
})

export default router
