import { createRouter, createWebHistory } from 'vue-router'
import AtendanceView from '../views/AtendanceView.vue'
import EmployeeView from '@/views/EmployeeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/attendance',
      name: 'Attendance',
      component: AtendanceView,
    },
    {
      path: '/employees',
      name: 'Employees',
      component: EmployeeView,
    }
  ],
})

export default router
