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
     <Button label="Add Payroll" @click="AddPayrollDialog = true"
      class="!border-none !bg-gray-600 hover:!bg-white !mr-3 hover:!text-gray-600" />
     <Button icon="pi pi-trash" @click="showDelete = true" class="!border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
  </div>

<!-- Create Payroll Dialog -->
<Dialog v-model:visible="AddPayrollDialog" modal header="Create Payroll" :style="{ width: '400px' }">
  <div class="text-white space-y-2 mb-6">
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label>Employee ID</label>
        <InputText v-model="form.employee_id" class="!w-full" placeholder="Enter employee ID" />
      </div>
      <div>
        <label>Batch</label>
        <InputText v-model="form.batch" class="!w-full" placeholder="Enter batch" />
      </div>
      <div>
        <label>Early</label>
        <InputText v-model="form.early" class="!w-full" placeholder="Enter early count" />
      </div>
      <div>
        <label>Late</label>
        <InputText v-model="form.late" class="!w-full" placeholder="Enter late count" />
      </div>
      <div>
        <label>Leaves</label>
        <InputText v-model="form.leaves" class="!w-full" placeholder="Enter leaves" />
      </div>
      <div>
        <label>Hourly Rate</label>
        <InputText v-model="form.hourly_rate" class="!w-full" placeholder="Enter hourly rate" />
      </div>
      <div>
        <label>Worked Hours</label>
        <InputText v-model="form.worked_hours" class="!w-full" placeholder="Enter worked hours" />
      </div>
      <div>
        <label>Monthly Hours</label>
        <InputText v-model="form.monthly_hours" class="!w-full" placeholder="Enter monthly hours" />
      </div>
      <div>
        <label>Bonus 1</label>
        <InputText v-model="form.bonus1" class="!w-full" placeholder="Enter bonus 1" />
      </div>
      <div>
        <label>Bonus 2</label>
        <InputText v-model="form.bonus2" class="!w-full" placeholder="Enter bonus 2" />
      </div>
    </div>
    <div>
        <label>Basic Salary</label>
        <InputText v-model="form.basic_salary" class="!w-full" placeholder="Enter basic salary" />
      </div>
  </div>
  <div class="flex gap-2 justify-between mt-4">
    <Button label="Cancel" @click="showAdd = false" class="!bg-gray-600 !border-none !text-white" />
    <Button label="Save" @click="addPayroll" class="!bg-white !text-[#0A0E17] !border-none" />
  </div>
</Dialog>


<!-- Detail Dialog -->
<Dialog
  v-model:visible="showDetail"
  modal
  header="Payroll Details"
  :style="{ width: '400px' }"
>
  <div v-if="selected" class="text-white space-y-2">
    <div class="flex flex-col justify-center gap-3">
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold">Employee ID :</label>
        <p class="text-gray-300 text-lg">{{ selected.employee_id }}</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold">Batch :</label>
        <p class="text-gray-300 text-lg">{{ selected.batch }}</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold">Early :</label>
        <p class="text-gray-300 text-lg">{{ selected.early }}</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold">Late :</label>
        <p class="text-gray-300 text-lg">{{ selected.late }}</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold">Leaves :</label>
        <p class="text-gray-300 text-lg">{{ selected.leaves }}</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold">Hourly Rate :</label>
        <p class="text-gray-300 text-lg">{{ selected.hourly_rate }}</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold">Worked Hours :</label>
        <p class="text-gray-300 text-lg">{{ selected.worked_hours }}</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold">Monthly Hours :</label>
        <p class="text-gray-300 text-lg">{{ selected.monthly_hours }}</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold">Bonus 1 :</label>
        <p class="text-gray-300 text-lg">{{ selected.bonus1 }}</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold">Bonus 2 :</label>
        <p class="text-gray-300 text-lg">{{ selected.bonus2 }}</p>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold">Basic Salary :</label>
        <p class="text-gray-300 text-lg">{{ selected.basic_salary }}</p>
      </div>
    </div>
  </div>
  <div class="flex gap-2 justify-end mt-6">
    <Button
      label="Edit"
      @click="openEdit"
      class="!bg-gray-600 hover:!bg-blue-700 !border-none !text-white"
    />
  </div>
</Dialog>

<!-- Edit Dialog -->
<Dialog
  v-model:visible="showEdit"
  modal
  header="Edit Payroll"
  :style="{ width: '400px' }"
>
  <div v-if="editPayroll" class="text-white space-y-2 mb-6">
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label>Employee ID</label>
        <InputText v-model="editPayroll.employee_id" :disabled="true" class="!w-full" placeholder="Enter employee ID" />
      </div>
      <div>
        <label>Batch</label>
        <InputText v-model="editPayroll.batch" :disabled="true" class="!w-full" placeholder="Enter batch" />
      </div>
      <div>
        <label>Early</label>
        <InputText v-model="editPayroll.early" class="!w-full" placeholder="Enter early count" />
      </div>
      <div>
        <label>Late</label>
        <InputText v-model="editPayroll.late" class="!w-full" placeholder="Enter late count" />
      </div>
      <div>
        <label>Leaves</label>
        <InputText v-model="editPayroll.leaves" class="!w-full" placeholder="Enter leaves" />
      </div>
      <div>
        <label>Hourly Rate</label>
        <InputText v-model="editPayroll.hourly_rate" class="!w-full" placeholder="Enter hourly rate" />
      </div>
      <div>
        <label>Worked Hours</label>
        <InputText v-model="editPayroll.worked_hours" class="!w-full" placeholder="Enter worked hours" />
      </div>
      <div>
        <label>Monthly Hours</label>
        <InputText v-model="editPayroll.monthly_hours" class="!w-full" placeholder="Enter monthly hours" />
      </div>
      <div>
        <label>Bonus 1</label>
        <InputText v-model="editPayroll.bonus1" class="!w-full" placeholder="Enter bonus 1" />
      </div>
      <div>
        <label>Bonus 2</label>
        <InputText v-model="editPayroll.bonus2" class="!w-full" placeholder="Enter bonus 2" />
      </div>
    </div>
    <div>
      <label>Basic Salary</label>
      <InputText v-model="editPayroll.basic_salary" class="!w-full" placeholder="Enter basic salary" />
    </div>
  </div>
  <div class="flex gap-2 justify-between mt-4">
    <Button
      label="Cancel"
      @click="showEdit = false"
      class="!bg-gray-600 !border-none !text-white"
    />
    <Button
      label="Save"
      @click="updatePayrollForm(editPayroll)"
      class="!bg-white !text-[#0A0E17] !border-none"
    />
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
import { useUpdatePayroll } from '@/composables/payroll/useUpdatePayroll.js';
import { onMounted, ref, reactive } from 'vue';

// Composables
const { payroll, loading, error, fetchPayroll } = usePayroll();
const { createPayroll } = useCreatePayroll();
const { deletePayroll } = useDeletePayroll();
const { updatePayroll } = useUpdatePayroll();

// Dialog visibility
const AddPayrollDialog = ref(false);
const showDetail = ref(false);
const showEdit = ref(false);
const showDelete = ref(false);
// Selected row
const selected = ref(null);

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

// Delete form
const deleteForm = reactive({
  batch: '',
  employee_id: ''
});

// Row styling
const rowClass = row =>
  selected.value && selected.value.employee_id === row.employee_id
    ? '!bg-gray-600 !text-white !border-none'
    : 'hover:!bg-gray-600 hover:!text-white';

// Add new payroll
const addPayroll = async () => {
  const employee_id = form.employee_id;
  const batch = form.batch;
  const early = form.early;
  const late = form.late;
  const leaves = form.leaves;
  const hourly_rate = form.hourly_rate;
  const worked_hours = form.worked_hours;
  const monthly_hours = form.monthly_hours;
  const bonus1 = form.bonus1;
  const bonus2 = form.bonus2;
  const basic_salary = form.basic_salary;

  const payrollData = {employee_id,batch,early,late,leaves, hourly_rate,worked_hours,monthly_hours,bonus1,bonus2,basic_salary };

  await createPayroll(payrollData);
  AddPayrollDialog.value = false;
  form.employee_id = '';
  form.batch = '';
  form.early = '';
  form.late = '';
  form.leaves = '';
  form.hourly_rate = '';
  form.worked_hours = '';
  form.monthly_hours = '';
  form.bonus1 = '';
  form.bonus2 = '';
  form.basic_salary = '';
  fetchPayroll();
}

// Confirm delete
function confirmDelete() {
  if (!deleteForm.batch || !deleteForm.employee_id) {
    alert('fill in all fields');
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

// Update payroll
const updatePayrollForm = async (fields) => {
  if (!fields) return;

  const batch = fields.batch;
  const employee_id = fields.employee_id;
  const early = fields.early;
  const late = fields.late;
  const leaves = fields.leaves;
  const hourly_rate = fields.hourly_rate;
  const worked_hours = fields.worked_hours;
  const monthly_hours = fields.monthly_hours;
  const bonus1 = fields.bonus1;
  const bonus2 = fields.bonus2;
  const basic_salary = fields.basic_salary;

  const payrollData = { batch, employee_id, early, late, leaves, hourly_rate, worked_hours, monthly_hours, bonus1, bonus2, basic_salary };

  await updatePayroll(payrollData);
  showEdit.value = false;
  fetchPayroll();
}

// Load data on mount
onMounted(() => {
  fetchPayroll();
});
</script>
