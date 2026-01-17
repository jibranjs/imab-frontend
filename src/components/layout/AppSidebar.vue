<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import logo from '@/assets/images/logo.png'
import { useRouter } from 'vue-router'

const router = useRouter()

const menuItems = ref([
  {
    label: 'Employees',
    icon: 'prime:users',
    to: '/'
  },
    {
    label: 'Payroll',
    icon: 'prime:receipt',
    to: '/payroll'
  },
     {
    label: 'Company',
    icon: 'prime:check-circle',
    to: '/company'
  },
])

const logout = () => {
  localStorage.clear()     // remove token + user data
  router.push('/login')
}

// Time
const liveTime = ref(new Date().toLocaleTimeString());

</script>

<template>
  <aside class="fixed top-0 left-0 w-[11rem] bg-[#374151] shadow-sm flex flex-col h-screen px-4 overflow-y-auto z-40">

    <!-- lOGO & Time -->
    <div class="!my-2 text-center">
      <img :src="logo" alt="Logo"
        class="w-[5rem] mx-auto">
      <p class="text-white bg-gray-500 w-[130px] my-3 rounded-lg !mx-auto"><span
          class="text-gray-700 font-bold mr-2">UK</span>{{ liveTime }}</p>
      <p class="text-white bg-gray-500 w-[130px] rounded-lg !mx-auto"><span
          class="text-gray-700 font-bold mr-2">PK</span>{{ liveTime }}</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 mt-3">
      <ul class="!space-y-1">
        <li v-for="item in menuItems" :key="item.label">
          <router-link :to="item.to"
            class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1F2937] transition-colors"
            :class="{ 'bg-[#1F2937]': $route.path === item.to }">
            <Icon :icon="item.icon" class="text-md text-white" />
            <span class="text-white">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- IMAB -->
    <div class="p-3 mb-3">
      <div class="text-center flex gap-2 items-center justify-center">
        <Button class="!bg-gray-600 !border-none hover:!bg-[#6B7280]"><span class=" pi pi-refresh"></span></Button>
        <Button class="!bg-gray-600 !border-none hover:!bg-[#6B7280]" @click="logout"><span class=" pi pi-power-off"></span></Button>
      </div>
    </div>
    <div class="text-center flex items-center justify-center">
        <span class="I">I</span>
        <span class="M">M</span>
        <span class="A">A</span>
        <span class="B">B</span>
      </div>
    <p class="text-sm text-gray-400 text-center mt-3" style="letter-spacing: 1rem;">core</p>
    <span class="text-sm text-white bg-gray-600 w-[120px] text-center mx-auto rounded-lg mt-3 py-[2.5px] mb-5">production</span>
  </aside>
</template>
