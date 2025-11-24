import { createRouter, createWebHistory } from 'vue-router'
import AtendanceView from '../views/AtendanceView.vue'
import EmployeeView from '@/views/EmployeeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProfilesView from '@/views/ProfilesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/attendance',
      name: 'Attendance',
      component: AtendanceView,
    },
    {
      path: '/employees',
      name: 'Employees',
      component: EmployeeView,
    },
    {
      path: '/profiles',
      name: 'Profiles',
      component: ProfilesView,
    },
  ],
})

export default router
