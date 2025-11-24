<script setup>
import { data } from '@/Data/EmployeeData';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProfileHeader from '@/components/ProfileComponents/ProfileHeader.vue';

const information = data
</script>
<template>
  <ProfileHeader />
<div class="flex items-center">
  <DataTable :value="information" class="w-[300px] h-screen overflow-scroll m-3">
    <Column header="Employee">
    <template #body="slotProps">
      <div class="text-white flex gap-4 items-center">
        <img :src="slotProps.data.employee_photo_url" :alt="slotProps.data.employee_name" class="w-[46px] rounded-[3px]">
        <div>
          <p>{{ slotProps.data.employee_name }}</p>
          <p class="text-gray-600 text-sm">{{ slotProps.data.employee_company_name }}</p>
          <p class="text-gray-600 text-sm">@{{ slotProps.data.employee_id }}</p>
        </div>
      </div>
    </template></Column>
</DataTable>
<div class="m-3 bg-[#1F2937] py-115 rounded  w-full">
<p class="text-gray-600 text-2xl text-center">Please select a Company or an Employee.</p>
</div>

</div>
</template>
