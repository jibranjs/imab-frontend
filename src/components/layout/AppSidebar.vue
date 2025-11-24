<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'

const menuItems = ref([
  {
    label: 'Dashboard',
    icon: 'mdi:view-dashboard',
    to: '/'
  },
  {
    label: 'Attendance',
    icon: 'mdi:account-group',
    to: '/attendance'
  },
  {
    label: 'Roaster',
    icon: 'mdi:chart-bar',
    to: '/roaster'
  },
  {
    label: 'Leaves',
    icon: 'mdi:cog',
    to: '/leaves'
  },
  {
    label: 'Calendar',
    icon: 'mdi:view-dashboard',
    to: '/calendar'
  },
  {
    label: 'Profiles',
    icon: 'mdi:account-group',
    to: '/profiles'
  },
  {
    label: 'Employees',
    icon: 'mdi:chart-bar',
    to: '/employees'
  },
  {
    label: 'Complaints',
    icon: 'mdi:cog',
    to: '/complaints'
  },
  {
    label: 'Insight',
    icon: 'mdi:view-dashboard',
    to: '/insight'
  },
  {
    label: 'Logs',
    icon: 'mdi:account-group',
    to: '/logs'
  }
])

// Time
const liveTime = ref(new Date().toLocaleTimeString());

</script>

<template>
  <aside class="fixed top-0 left-0 w-[11rem] bg-[#374151] shadow-sm flex flex-col h-screen px-4 overflow-y-auto z-40">

    <!-- lOGO & Time -->
    <div class="!my-2 text-center">
      <img src="/home/xiots/Documents/vuejs/imab-frontend/src/assets/images/logo.png" alt="Logo"
        class="w-[5rem] mx-auto">
      <p class="text-white bg-gray-500 w-[130px] my-3 rounded-lg !mx-auto"><span
          class="text-gray-700 font-bold mr-2">UK</span>{{ liveTime }}</p>
      <p class="text-white bg-gray-500 w-[130px] rounded-lg !mx-auto"><span
          class="text-gray-700 font-bold mr-2">PK</span>{{ liveTime }}</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1">
      <ul class="!space-y-1">
        <li v-for="item in menuItems" :key="item.label">
          <router-link :to="item.to"
            class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            :class="{ 'bg-gray-600': $route.path === item.to }">
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
        <Button class="!bg-gray-600 !border-none hover:!bg-[#6B7280]"><span class=" pi pi-power-off"></span></Button>
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
