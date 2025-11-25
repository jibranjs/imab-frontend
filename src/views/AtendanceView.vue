<template>
  <div class="flex items-center py-4 justify-between px-4">
    <div>
      <h2 class="text-white font-bold text-3xl ">All Attendance</h2>
      <p class="text-white/85 text-sm">Showing 101 results.</p>
    </div>
    <div>
      <div class="flex gap-4">
       <MultiSelect v-model="roaster" display="chip"  optionLabel="name" filter placeholder="Select Employee"
    :maxSelectedLabels="3" class="w-full md:w-80" />
        <MultiSelect  placeholder="All Companies" :maxSelectedLabels="3" />
         <MultiSelect  placeholder="Active" :maxSelectedLabels="3" />
          <MultiSelect  placeholder="All" :maxSelectedLabels="3" />
          <Button class="bg-gray-500 px-4 !py-2 rounded hover:bg-gray-300"><span class="pi pi-check"></span> Add Employee</Button>
          <Button class="bg-gray-500 px-4 rounded hover:bg-gray-300"><span class="pi pi-refresh"></span></Button>
      </div>
    </div>
  </div>
  <p v-if="loading" class="text-gray-300 text-center mt-4"></p>
  <p v-if="error" class="text-red-400 text-center mt-4">{{ error }}</p>
  <DataTable v-if="!loading" :value="attendance" paginator :rows="12" :rowsPerPageOptions="[10, 20]" class="!py-0 !px-0">
    <Column header="Employee Name" class="!py-2 !px-6" sortable="">
      <template #body="slotProps">
          <div class="text-white">{{ slotProps.data.employee_name }}</div>
          <div class="text-gray-500 text-sm">{{ slotProps.data.employee_company_name }}</div>
          <div class="text-gray-500 text-sm">@{{ slotProps.data.employee_id }}</div>
      </template>
    </Column>
    <Column header="Date" class="!py-2">
      <template #body="slotProps">
        <div class="text-white">{{ slotProps.data.shift_in_day }}</div>
        <div class="text-gray-500 text-sm">{{ slotProps.data.shift_in_month }}</div>
      </template>
    </Column>
    <Column header="Roaster" class="!py-2">
      <template #body="slotProps">
        <div class="flex items-center gap-2">
          <div class="text-sm">
            <div class="text-white">{{ slotProps.data.shift_in }}</div>
            <div class="text-white">{{ slotProps.data.shift_out }}</div>
          </div>
          <div class="bg-gray-500 text-white px-3 py-2 rounded">{{ slotProps.data.shift_in_time }}</div>
        </div>
      </template>
    </Column>
    <Column header="Attendance" class="!py-2">
      <template #body="slotProps">
        <div class="flex items-center gap-2">
          <div class="text-sm">
            <div class="text-white">{{ slotProps.data.attendance_checkin }}</div>
            <div class="text-white">{{ slotProps.data.attendance_checkout }}</div>
          </div>
          <div class="bg-gray-500 text-white px-3 py-2 rounded">{{ slotProps.data.shift_in_time }}</div>
          <div class="bg-gray-500 text-white px-3 py-2 rounded">{{ slotProps.data.shift_out_time }}</div>
        </div>
      </template>
    </Column>
    <Column header="Status" class="!py-2">
      <template #body="slotProps">
        <div
          :class="slotProps.data.attendance_status_in === 'LATE' ? 'bg-yellow-200 rounded text-center' : 'bg-gray-400 rounded text-center'">
          {{ slotProps.data.attendance_status_in }}
        </div>
        <div
          :class="slotProps.data.attendance_status_out === 'LATE' ? 'bg-yellow-200 rounded px-4 mt-1 text-center' : 'bg-gray-400  rounded mt-1 text-center '">
          {{ slotProps.data.attendance_status_out }}</div>
      </template>
    </Column>

  </DataTable>

</template>
<script setup>
import { onMounted } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import MultiSelect from 'primevue/multiselect';
import { useAttendance } from '@/composables/useAttendance'

const { attendance, loading, error, fetchattendance } = useAttendance();

onMounted(() => {
  fetchattendance();
});
</script>
