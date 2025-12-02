import { createRouter, createWebHistory } from 'vue-router'
import AtendanceView from '@/views/EmployeeView.vue'
import PayrollView from '@/views/PayrollView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/employees',
      name: 'Employees',
      component: AtendanceView,
    },
    {
      path: '/payroll',
      name: 'Payroll',
      component: PayrollView,
    }
  ],
})

export default router
