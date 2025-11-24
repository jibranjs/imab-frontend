import { createRouter, createWebHistory } from 'vue-router'
import AtendanceView from '../views/AtendanceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/attendance',
      name: 'Attendance',
      component: AtendanceView,
    },
  ],
})

export default router
