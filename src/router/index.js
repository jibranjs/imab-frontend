import { createRouter, createWebHistory } from 'vue-router'
import AtendanceView from '@/views/EmployeeView.vue'
import PayrollView from '@/views/PayrollView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/employees',
      name: 'Employees',
      component: AtendanceView,
      meta: { requiresAuth: true }
    },
    {
      path: '/payroll',
      name: 'Payroll',
      component: PayrollView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { requiresAuth: false }
    }
  ],
})

export default router
