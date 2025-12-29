<template>
  <!-- Top Bar -->
  <div class="flex justify-end items-center px-6">
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
        <label>Employee</label>
        <Select v-model="form.employee_id" :options="employeeShort" optionLabel="name" optionValue="id" class="!w-full" placeholder="Select employee" />
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
      <!-- Create Error -->
      <div v-if="createError">
        <div class="bg-red-500 text-white p-2 rounded-md">
          <p class="text-red-300 text-center">{{ createError }}</p>
        </div>
      </div>
      </div>
  <div class="flex gap-2 justify-between mt-4">
    <Button label="Cancel" @click="showAdd = false" class="!bg-gray-600 !border-none !text-white" />
    <Button label="Save" :loading="createLoading" @click="addPayroll" class="!bg-white !text-[#0A0E17] !border-none" />
  </div>
</Dialog>


<!-- Update Dialog -->
<Dialog v-model:visible="showUpdateDialog" modal header="Update Payroll" :style="{ width: '400px' }">
    <div class="grid grid-cols-2 gap-3 text-white">
      <div>
        <label>Employee ID</label>
        <Select v-model="form.employee_id" :options="employeeShort" optionLabel="name" optionValue="id" class="!w-full" disabled placeholder="Select employee" />
      </div>
      <div>
        <label>Batch</label>
        <InputText v-model="form.batch" :disabled="true" class="!w-full" placeholder="Enter batch" />
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
    <div class="text-white">
      <label>Basic Salary</label>
      <InputText v-model="form.basic_salary" class="!w-full" placeholder="Enter basic salary" />
    </div>
     <!-- Update Error -->
      <div v-if="updatePayrollError">
        <div class="bg-red-500 text-white p-2 rounded-md">
          <p class="text-red-300 text-center">{{ updatePayrollError }}</p>
        </div>
      </div>
  <div class="flex gap-2 justify-between mt-4 ">
    <Button
      label="Close"
      @click="showUpdateDialog = false"
      class="!bg-gray-600 !border-none !text-white"
    />
    <Button :loading="updatePayrollLoading"
      label="Update"
      @click="updatePayrollForm()"
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
      <div v-if="deleteLoading">
        <div class="text-white text-center">Deleting...</div>
      </div>
      <div v-if="deleteError">
        <div class="bg-red-500 text-white p-2 rounded-md">
          <p class="text-red-300 text-center">{{ deleteError }}</p>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" @click="showDelete = false"
        class="!bg-gray-600 hover:!bg-red-300 !border-none !text-white" />
      <Button label="Delete" @click="DeletePayrollForm()"
        class="!bg-red-600 hover:!bg-red-700 !border-none !text-white" />
    </div>
  </Dialog>

  <!-- Data Table -->
  <p v-if="loading" class="text-white text-center text-xl mb-2">Loading...</p>
  <p v-if="error" class="text-red-300 text-center">{{ error }}</p>

  <DataTable :value="payroll" rowHover :rowClass="rowClass" tableStyle="min-width: 50rem">
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
    <Column field="actions" header="Actions">
      <template #body="slotProps">
        <div class="flex gap-2">
          <Button @click="ShowDetails(slotProps.data)"
            class="!bg-gray-600 !border-none !text-white hover:!bg-white hover:!text-gray-600">
            <span class="pi pi-pencil w-[20px]"></span>
          </Button>
          <Button @click="ShowDelete(slotProps.data)"
            class="!bg-gray-600 !border-none !text-white hover:!bg-white hover:!text-gray-600">
            <span class="pi pi-trash w-[20px]"></span>
          </Button>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import { usePayroll } from '@/composables/payroll/usePayroll.js';
import { useCreatePayroll } from '@/composables/payroll/useCreatePayroll.js';
import { useDeletePayroll } from '@/composables/payroll/useDeletePayroll.js';
import { useUpdatePayroll } from '@/composables/payroll/useUpdatePayroll.js';
import { onMounted, ref, reactive } from 'vue';
import { useEmployeeShort } from '@/composables/useEmployeesShort';

// Composables
const { payroll, loading, error, fetchPayroll } = usePayroll();
const { createPayroll, loading: createLoading, error: createError } = useCreatePayroll();
const { deletePayroll, loading: deleteLoading, error: deleteError } = useDeletePayroll();
const { updatePayroll, loading: updatePayrollLoading, error: updatePayrollError } = useUpdatePayroll();
const { employeeShort, fetchEmployeesShort } = useEmployeeShort();

// Dialog visibility
const AddPayrollDialog = ref(false);
const showUpdateDialog = ref(false);
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

// Open edit dialog
const ShowDetails = (data) => {
  form.employee_id = data.employee_id;
  form.batch = data.batch;
  form.early = data.early;
  form.late = data.late;
  form.leaves = data.leaves;
  form.hourly_rate = data.hourly_rate;
  form.worked_hours = data.worked_hours;
  form.monthly_hours = data.monthly_hours;
  form.bonus1 = data.bonus1;
  form.bonus2 = data.bonus2;
  form.basic_salary = data.basic_salary;
  showUpdateDialog.value = true;
}


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

 const response = await createPayroll(payrollData);
 if(response && response.success){
    AddPayrollDialog.value = false;
    fetchPayroll();
 } else {
  createError.value = response.message
 }
}

// Delete payroll
const deleteForm = reactive({
  batch: '',
  employee_id: ''
});

const ShowDelete = (data) =>{
  deleteForm.batch = data.batch;
  deleteForm.employee_id = data.employee_id;
  showDelete.value = true;
}
const DeletePayrollForm = async () => {
  if (!deleteForm) return;

  const batch = deleteForm.batch;
  const employee_id = deleteForm.employee_id;
  const deletepayrollData = {
    batch,
    employee_id
  };
  const response = await deletePayroll(deletepayrollData);
  if (response && response.success){
    showDelete.value = false;
    fetchPayroll();
  } else {
    deleteError.value = response.message;
  }

}

// Update payroll
const updatePayrollForm = async () => {
  const batch = form.batch;
  const employee_id = form.employee_id;
  const early = form.early;
  const late = form.late;
  const leaves = form.leaves;
  const hourly_rate = form.hourly_rate;
  const worked_hours = form.worked_hours;
  const monthly_hours = form.monthly_hours;
  const bonus1 = form.bonus1;
  const bonus2 = form.bonus2;
  const basic_salary = form.basic_salary;

  const payrollData = { batch, employee_id, early, late, leaves, hourly_rate, worked_hours, monthly_hours, bonus1, bonus2, basic_salary };

  const response = await updatePayroll(payrollData);

  if (response && response.success){
    showUpdateDialog.value = false;
    fetchPayroll();
  } else {
    updatePayrollError.value = response.error || response.message;
  }
}

// Load data on mount
onMounted(async () => {
  await fetchPayroll();
  await fetchEmployeesShort();
});
</script>
