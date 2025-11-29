import { createRouter, createWebHistory } from 'vue-router'
import AtendanceView from '@/views/EmployeeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/employees',
      name: 'Employees',
      component: AtendanceView,
      meta: { public: false },
    }
  ],
})

export default router
