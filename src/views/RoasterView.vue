<template>
  <div class="flex items-center py-4 justify-between px-4">
    <div>
      <h2 class="text-white font-bold text-3xl ">All Roaster</h2>
      <p class="text-white/85 text-sm">Showing 101 results.</p>
    </div>
    <div>
      <div class="flex gap-4">
        <MultiSelect v-model="info" display="chip" optionLabel="name" filter placeholder="All Employee"
          :maxSelectedLabels="3" class="w-full md:w-80" />
        <MultiSelect placeholder="All Companies" :maxSelectedLabels="3" />
        <MultiSelect placeholder="All" :maxSelectedLabels="3" />
        <DatePicker v-model="value" inputId="date" showIcon iconDisplay="input" variant="filled" />
        <Button class="bg-gray-500 px-4 !py-2 rounded hover:bg-gray-300"><span class="pi pi-plus"></span></Button>
        <Button class="bg-gray-500 px-4 rounded hover:bg-gray-300"><span class="pi pi-refresh"></span></Button>
      </div>
    </div>
  </div>
  <p v-if="loading" class="text-gray-400 text-center mt-4">Loading Roaster...</p>
  <p v-if="error" class="text-gray-400 text-center mt-4">{{ error }}</p>
  <DataTable :value="roaster">
    <Column header="Employee">
      <template #body="slotProps">
        <div>
          <div class="flex gap-6 items-center">
            <Checkbox binary size="large" />
            <div class="flex items-center gap-4">
              <img src="/home/xiots/Documents/vuejs/imab-frontend/src/assets/images/profile.png"
                :alt="slotProps.data.employee_name" class="w-[3rem] h-[3rem] bg-gray-300 p-1 rounded">
              <div>
                <h2 class="text-white">{{ slotProps.data.employee_name }}</h2>
                <p class="text-xs text-gray-500">{{ slotProps.data.employee_company_name }}</p>
                <div class="flex gap-6">
                  <p class="text-xs text-gray-500">@{{ slotProps.data.employee_id }}</p>
                  <p class="text-sm text-gray-500">{{ slotProps.data.employee_status }}</p>
                  <p class="text-sm text-gray-500">{{ slotProps.data.employee_department }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Column>
    <Column header="Day">
      <template #body="slotProps">
        <h2 class="text-white">{{ slotProps.data.roster_day }}</h2>
        <p class="text-sm text-gray-500">{{ slotProps.data.roster_month }}</p>
      </template>
    </Column>
    <Column header="Timming">
      <template #body="slotProps">
        <div class="flex gap-4 items-center">
          <div>
            <p class="text-white">{{ slotProps.data.roster_start }}</p>
            <p class="text-white">{{ slotProps.data.roster_end }}</p>
          </div>
          <p class="text-white bg-gray-500 px-3 py-2 rounded"> 01:00</p>
        </div>
      </template>
    </Column>
    <Column header="Status">
      <template #body="slotProps">
        <h2 class="text-[#1F2937] bg-gray-500 flex items-center justify-center text-center font-semibold rounded-full">
          {{ slotProps.data.shift_type }}</h2>
      </template>
    </Column>
    <Column header="Comments">
      <template #body >
        <p class="text-gray-500">No Comments</p>
      </template>
    </Column>
  </DataTable>

</template>
<script setup>
import MultiSelect from 'primevue/multiselect';
import DatePicker from 'primevue/datepicker';
import { useRoaster } from '@/composables/useRoaster';
import { onMounted } from 'vue';
import Button from 'primevue/button'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';

const { roaster, loading, error, fetchRoaster } = useRoaster();

onMounted(
  fetchRoaster()
)

</script>
