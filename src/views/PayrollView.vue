<template>
  <!-- Top Bar -->
  <div class="flex justify-end items-center px-6">
    <div class="relative !m-5">
      <InputText placeholder="Search..." class="pr-10" />
      <Button icon="pi pi-search"
        class="!absolute right-1 top-1/2 -translate-y-1/2 !p-2 !border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
    </div>
    <Button label="Refresh" @click="fetchPayroll"
      class="!m-5 !border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
    <Button label="Add Payroll" @click="showAdd = true"
      class="!border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
  </div>

  <!-- Add Dialog -->
  <Dialog v-model:visible="showAdd" modal header="Create Payroll" :style="{ width: '370px' }">
    <div>
      <div v-for="field in fields" :key="field" class="flex flex-col gap-2 mb-4">
        <label class="font-semibold text-white">
          {{ field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ') }}
        </label>
        <InputText v-model="form[field]" :placeholder="field" />
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" @click="showAdd = false"
        class="!bg-gray-600 hover:!bg-red-300 !border-none !text-white" />
      <Button label="Save" @click="addPayroll"
        class="!bg-white !text-[#0A0E17] !border-none" />
    </div>
  </Dialog>

  <!-- Detail Dialog -->
  <Dialog v-model:visible="showDetail" modal header="Payroll Details" :style="{ width: '400px' }">
    <div v-if="selected">
      <div class="space-y-3">
        <div v-for="field in fields" :key="field" class="flex justify-between">
          <span class="font-semibold text-white">
            {{ field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ') }}:
          </span>
          <span class="text-gray-300">{{ selected[field] }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-6">
      <Button label="Delete" @click="openDelete"
        class="!bg-red-600 hover:!bg-red-700 !border-none !text-white" />
      <Button label="Edit" @click="openEdit"
        class="!bg-blue-600 hover:!bg-blue-700 !border-none !text-white" />
    </div>
  </Dialog>

  <!-- Edit Dialog -->
  <Dialog v-model:visible="showEdit" modal header="Edit Payroll" :style="{ width: '370px' }">
    <div v-if="editPayroll">
      <div v-for="field in fields" :key="field" class="flex flex-col gap-2 mb-4">
        <label class="font-semibold text-white">
          {{ field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ') }}
        </label>
        <InputText v-model="editPayroll[field]" :placeholder="field" />
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" @click="showEdit = false"
        class="!bg-gray-600 hover:!bg-red-300 !border-none !text-white" />
      <Button label="Save" @click="saveEdit"
        class="!bg-white !text-[#0A0E17] !border-none" />
    </div>
  </Dialog>

  <!-- Delete Dialog -->
  <Dialog v-model:visible="showDelete" modal header="Delete Payroll" :style="{ width: '370px' }">
    <div>
      <div class="flex flex-col gap-2 mb-4">
        <label class="font-semibold text-white">Batch</label>
        <InputText v-model="deleteForm.batch" placeholder="Batch" />
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label class="font-semibold text-white">Employee ID</label>
        <InputText v-model="deleteForm.employee_id" placeholder="Employee ID" />
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" @click="showDelete = false"
        class="!bg-gray-600 hover:!bg-red-300 !border-none !text-white" />
      <Button label="Delete" @click="confirmDelete"
        class="!bg-red-600 hover:!bg-red-700 !border-none !text-white" />
    </div>
  </Dialog>

  <!-- Loading & Error Messages -->
  <p v-if="loading" class="text-white text-center text-xl mb-2">Loading...</p>
  <p v-if="error" class="text-red-300 text-center">{{ error }}</p>

  <!-- Data Table -->
  <DataTable :value="payroll" v-model:selection="selected" selectionMode="single" @rowSelect="showDetail = true" rowHover :rowClass="rowClass" tableStyle="min-width: 50rem">
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
import { useDeletePayroll } from '@/composables/payroll/useDeletePayroll.js';
import { onMounted, ref, reactive } from 'vue';

// Composables
const { payroll, loading, error, fetchPayroll } = usePayroll();
const { createPayroll } = useCreatePayroll();
const { deletePayroll } = useDeletePayroll();

// Dialog visibility
const showAdd = ref(false);
const showDetail = ref(false);
const showEdit = ref(false);
const showDelete = ref(false);

// Selected row
const selected = ref(null);

// Form fields
const fields = [
  'employee_id', 'batch', 'early', 'late', 'leaves',
  'hourly_rate', 'worked_hours', 'monthly_hours',
  'bonus1', 'bonus2', 'basic_salary'
];

// Add form
const form = reactive({
  employee_id: '', batch: '', early: '', late: '', leaves: '',
  hourly_rate: '', worked_hours: '', monthly_hours: '',
  bonus1: '', bonus2: '', basic_salary: ''
});

// Edit form
const editPayroll = ref(null);
// Open edit dialog
function openEdit() {
  if (!selected.value) return;
  editPayroll.value = { ...selected.value };
  showDetail.value = false;
  showEdit.value = true;
}
// Save edited payroll
function saveEdit() {
  if (!editPayroll.value) return;

  const index = payroll.value.findIndex(p => p.employee_id === editPayroll.value.employee_id);
  if (index !== -1) {
    payroll.value[index] = { ...editPayroll.value };
    selected.value = { ...editPayroll.value };
  }
  showEdit.value = false;
}

// Delete form
const deleteForm = reactive({
  batch: '',
  employee_id: ''
});
// Open delete dialog
function openDelete() {
  if (!selected.value) return;
  deleteForm.batch = selected.value.batch;
  deleteForm.employee_id = selected.value.employee_id;
  showDetail.value = false;
  showDelete.value = true;
}

// Row styling
const rowClass = row =>
  selected.value && selected.value.employee_id === row.employee_id
    ? '!bg-gray-600 !text-white !border-none'
    : 'hover:!bg-gray-600 hover:!text-white';

// Add new payroll
function addPayroll() {
  if (Object.values(form).some(value => !value)) {
    alert('Please fill in all fields');
    return;
  }

  createPayroll(form)
    .then(() => {
      fetchPayroll();
      showAdd.value = false;
      Object.keys(form).forEach(key => form[key] = '');
    })
    .catch(err => {
      console.error('Error creating payroll:', err);
      alert('Error creating payroll');
    });
}

// Confirm delete
function confirmDelete() {
  if (!deleteForm.batch || !deleteForm.employee_id) {
    alert('Please fill in all fields');
    return;
  }

  deletePayroll(deleteForm)
    .then(() => {
      fetchPayroll();
      showDelete.value = false;
      selected.value = null;
      deleteForm.batch = '';
      deleteForm.employee_id = '';
    })
    .catch(err => {
      console.error('Error deleting payroll:', err);
      alert('Error deleting payroll');
    });
}

// Load data on mount
onMounted(() => {
  fetchPayroll();
});
</script>
