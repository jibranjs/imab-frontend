import { createRouter, createWebHistory } from 'vue-router'
import AtendanceView from '../views/AtendanceView.vue'
import EmployeeView from '@/views/EmployeeView.vue'
import LoginView from '@/views/LoginView.vue'
import RoasterView from '@/views/RoasterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView,
      meta: { public: true },
    },
    {
      path: '/attendance',
      name: 'Attendance',
      component: AtendanceView,
      meta: { public: false },
    },
    {
      path: '/employees',
      name: 'Employees',
      component: EmployeeView,
      meta: { public: false },
    },
     {
      path: '/roaster',
      name: 'roaster',
      component: RoasterView,
      meta: { public: false },
    },
  ],
})

export default router
