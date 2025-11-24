<script setup>
import DashboardHeader from '@/components/DashboardComponents/DashboardHeader.vue';
import Badge from 'primevue/badge';

</script>
<template>
  <DashboardHeader />
  <div class="grid grid-cols-3 gap-4 py-6 px-4 text-gray-400">
  <div>
      <p><Badge value="0" severity="warn" />LATE</p>
      <div>
        <p class="text-white">{{ }}</p>
        <p></p>
      </div>
  </div>
   <div><p><Badge value="0" severity="info" />EARLY</p>
   </div>
    <div>
      <p><Badge value="0" severity="success" />OVERTIME</p>
    </div>
  </div>
</template>
