<template>
  <div class="flex justify-end items-center px-6">
    <div class="relative !m-5">
      <InputText placeholder="Search..." class="pr-10" />
      <Button icon="pi pi-search"
        class="!absolute right-1 top-1/2 -translate-y-1/2 !p-2 !border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
    </div>
    <Button label="Refresh" @click="fetchPayroll" class="!m-5 !border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
    <Button label="Add Payroll" @click="showAdd = true" class="!border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
  </div>

  <!-- Add Payroll Dialog -->
    <Dialog v-model:visible="showAdd" modal header="Create Payroll" :style="{ width: '370px' }">
    <div v-for="field in fields" :key="field" class="flex flex-col w-24 gap-4 mb-4">
      <label :for="field" class="font-semibold w-full text-white">{{ field.charAt(0).toUpperCase() + field.slice(1) }}</label>
      <InputText :id="field" v-model="form[field]" class="flex-auto" :placeholder="field" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" @click="showAdd = false" class="!bg-gray-600 hover:!bg-red-300 !border-none !text-[#0A0E17]" />
      <Button label="Save" @click="addPayroll" class="!bg-white !text-[#0A0E17] !border-none bg-success" />
    </div>
  </Dialog>
  <p v-if="loading" class="text-white text-center text-xl mb-2">Loading...</p>
  <p v-if="error" class="text-red-300 text-center">{{ error }}</p>
  <DataTable :value="payroll" tableStyle="min-width: 50rem">
    <Column field="employee_id" header="ID"></Column>
    <Column field="batch" header="Batch"></Column>
    <Column field="early" header="Early"></Column>
    <Column field="late" header="Late"></Column>
    <Column field="leaves" header="Leaves"></Column>
    <Column field="hourly_rate" header="Hourly Rate"></Column>
    <Column field="worked_hours" header="Worked Hours"></Column>
    <Column field="monthly_hours" header="Monthly Hours"></Column>
    <Column field="bonus1" header="Bonus 1"></Column>
    <Column field="bonus2" header="Bonus 2"></Column>
    <Column field="basic_salary" header="Basic Salary"></Column>
  </DataTable>
</template>
<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import { usePayroll } from '@/composables/payroll/usePayroll.js';
import { useCreatePayroll } from '@/composables/payroll/useCreatePayroll.js';
import { onMounted, ref, reactive } from 'vue';

const { payroll, loading, error, fetchPayroll } = usePayroll();
const { createPayroll } = useCreatePayroll();

const showAdd = ref(false);
const fields = [
  'employee_id',
  'batch',
  'early',
  'late',
  'leaves',
  'hourly_rate',
  'worked_hours',
  'monthly_hours',
  'bonus1',
  'bonus2',
  'basic_salary'
];
const form = reactive({
  employee_id: '',
  batch: '',
  early: '',
  late: '',
  leaves: '',
  hourly_rate: '',
  worked_hours: '',
  monthly_hours: '',
  bonus1: '',
  bonus2: '',
  basic_salary: ''
});

function addPayroll() {
  // Validate form fields
  if (Object.values(form).some(value => !value)) {
    alert('Please fill in all fields');
    return;
  }

  // Submit form to API
  createPayroll(form).then(() => {
    // Refetch payroll from API instead of pushing
    fetchPayroll();
    // Close dialog and reset form
    showAdd.value = false;
    Object.keys(form).forEach(key => form[key] = '');
  }).catch(err => {
    console.error('Error creating payroll:', err);
  });
}

onMounted(() => {
  fetchPayroll();
});
</script>
