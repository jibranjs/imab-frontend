<template>
  <DashboardHeader />
  <p v-if="loading" class="text-center text-gray-300">Loading Dashboard</p>
  <p v-if="error" class="text-rad-300">{{ error }}</p>
  <div class="flex justify-start flex-wrap gap-6 py-6 px-4">
    <DataView :value="dashboard">
    <div>
          <p class="text-white"><Badge value="0" severity="warn" />LATE</p>
          <template #list="slotProps">
            <div>{{ slotProps }}</div>

          </template>

      </div>
      <div>
        <p class="text-white"><Badge value="0" severity="info" />EARLY</p>
      </div>
        <div>
          <p class="text-white"><Badge value="0" severity="success" />OVERTIME</p>
        </div>
        <div>
          <p class="text-white"><Badge value="0" severity="warn" />LATE</p>
          <div></div>
      </div>
      <div>
        <p class="text-white"><Badge value="0" severity="info" />EARLY</p>
      </div>
        <div>
          <p class="text-white"><Badge value="0" severity="success" />OVERTIME</p>
        </div>
    </DataView>

  </div>
</template>
<script setup>
import DashboardHeader from '@/components/DashboardComponents/DashboardHeader.vue';
import Badge from 'primevue/badge';
import { useDashboard } from '@/composables/useDashboard';
import { onMounted } from 'vue';
import DataView from 'primevue/dataview';


const {  dashboard, loading, error, fetchDashboard } = useDashboard()

onMounted(
  fetchDashboard()
)

</script>
