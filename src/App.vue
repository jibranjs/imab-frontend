<script setup>
import { RouterView } from 'vue-router'
import AppSidebar from './components/layout/AppSidebar.vue'
</script>

<template>
  <div class="min-h-screen flex bg-gray-50 relative">
    <AppSidebar />
    <div class="flex-1 flex flex-col pl-[11rem]">
      <main class="flex-1 bg-[#111827]">
        <RouterView />
      </main>

    </div>
  </div>
</template>
