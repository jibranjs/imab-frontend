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
<Dialog v-model:visible="AddPayrollDialog" @hide="resetPayrollForm" modal header="Create Payroll" :style="{ width: '800px' }">
  <div class="text-white space-y-2 mb-6">
    <div class="grid grid-cols-3 justify-center gap-6">
      <!-- Col 1 -->
       <div class="mb-4">
        <h2 class="text-lg font-bold ">Employee Details</h2>
        <hr class="mb-3 mt-2 border-[#6B7280]">
          <div>
            <label>Employee Id</label>
            <InputText v-model="form.employee_id" class="!w-full !mb-3" placeholder="Employee ID" />
          </div>
          <div>
            <label>Company ID</label>
            <InputText v-model="form.company_id" class="!w-full !mb-3" placeholder="Company ID" />
          </div>
          <div>
            <label>Batch Name</label>
            <InputText v-model="form.batch_name" class="!w-full !mb-3" placeholder="Enter batch name" />
          </div>
       </div>
        <div class="mb-4">
          <h2 class="text-lg font-bold">Attendance</h2>
          <hr class="mb-3 mt-2 border-[#6B7280]">
        <div>
          <label>Lates</label>
          <InputText v-model="form.employee_lates" class="!w-full !mb-3" placeholder="Enter Lates" />
        </div>
         <div>
          <label>Early</label>
          <InputText v-model="form.employee_early" class="!w-full !mb-3" placeholder="Enter Early" />
        </div>
         <div>
          <label>Leaves</label>
          <InputText v-model="form.employee_leaves" class="!w-full !mb-3" placeholder="Enter leaves hours" />
        </div>
        </div>

      <!-- Col 2 -->
      <div class="mb-4">
        <h2 class="text-lg font-bold">Hours</h2>
        <hr class="mb-3 mt-2 border-[#6B7280]">
        <div>
          <label>Contract hours</label>
          <InputText v-model="form.employee_contract_hours" class="!w-full !mb-3" placeholder="Enter leaves" />
        </div>
        <div>
          <label>Rota hours</label>
          <InputText v-model="form.employee_rota_hours" class="!w-full !mb-3" placeholder="Enter hourly rate" />
        </div>
        <div>
          <label>Worked Hours</label>
          <InputText v-model="form.employee_worked_hours" class="!w-full !mb-3" placeholder="Enter worked hours" />
        </div>
      </div>
    </div>
    <!-- Create Error -->
    <div v-if="createError" class="bg-red-800 w-full mx-auto text-white p-2 rounded-md">
      <p class="text-center">{{ createError }}</p>
    </div>
  </div>

  <div class="flex gap-2 justify-between mt-4">
    <Button label="Cancel" @click="AddPayrollDialog = false" :disabled="createLoading" class="!bg-gray-600 !border-none !text-white" />
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
      <div class="flex gap-4 mb-4 ">
        <h2 class="font-semibold text-white">Batch Name :</h2>
        <p class="text-white">{{ deleteForm.batch_name }}</p>
      </div>
      <div class="flex gap-4 mb-4">
        <h2 class="font-semibold text-white">ID :</h2>
        <p class="text-white">{{ deleteForm.id }}</p>
      </div>
      <div v-if="deleteLoading">
        <div class="text-gray-300 font-semibold text-center">Deleting...</div>
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

  <!-- Details Dialog with nested DataTable -->
  <Dialog v-model:visible="showDetailsDialog" modal header="Details" :style="{ width: '1200px' }">
    <div v-if="selectedPayrollRow" class="space-y-6">
      <!-- Employee Information -->
      <div class="bg-gray-700 p-4 rounded-lg">
        <h3 class="text-white text-lg font-bold mb-4">Employee Information</h3>
          <div class="grid grid-cols-4 gap-4 text-white">
          <div>
              <span class="font-semibold">Employee</span>
              <p class="text-gray-300 font-semibold">{{ selectedPayrollRow.employee_name }}</p>
              <p class="text-gray-400">ID {{ selectedPayrollRow.employee_id }}</p>
          </div>
          <div>
            <span class="font-semibold">Department</span>
            <p class="text-gray-300 font-semibold">{{ selectedPayrollRow.employee_department }}</p>
            <p class="text-sm text-gray-400">Status: {{ selectedPayrollRow.employee_status }}</p>
          </div>
          <div>
            <span class="font-semibold">Company</span>
            <p class="font-semibold text-gray-300">{{ selectedPayrollRow.company_name }}</p>
            <p class="text-sm text-gray-400">@{{ selectedPayrollRow.company_id }}</p>
          </div>
           <div>
            <span class="font-semibold">Batch</span>
            <p class="font-semibold text-gray-300">{{ selectedPayrollRow.batch_name }}</p>
            <p class="text-sm text-gray-400">Status : {{ selectedPayrollRow.batch_status }}</p>
          </div>
        </div>
      </div>

      <!-- Attendance & Work Details Table -->
      <div class="bg-gray-700 p-4 rounded-lg">
        <h3 class="text-white text-lg font-bold mb-4">Attendance & Work Details</h3>
        <DataTable :value="[selectedPayrollRow]" tableStyle="min-width: 100%">
          <Column field="employee_contract_hours" header="Contract Hours" />
          <Column field="employee_rota_hours" header="Rota Hours" />
          <Column field="employee_worked_hours" header="Worked Hours" />
          <Column field="employee_net_hours" header="Net Hours" />
          <Column field="employee_over_below" header="Over/below Hours" />
          <Column field="employee_early" header="Early Departures" />
          <Column field="employee_lates" header="Lates" />
          <Column field="employee_leaves" header="Leaves" />
          <Column field="employee_score" header="Score" />
        </DataTable>
      </div>

      <!-- Salary DataTable -->
      <div class="bg-gray-700 p-4 rounded-lg">
        <h3 class="text-white text-lg font-bold mb-4">Salary Details</h3>
        <DataTable :value="[selectedPayrollRow]" tableStyle="min-width: 100%">
          <Column field="employee_basic_salary" header="Basic Salary" />
          <Column field="employee_hourly_rate" header="hourly Rate" />
          <Column field="employee_worked_hours" header="Worked Hours" />
          <Column field="total_gross" header="Gross" />
          <Column field="total_addition" header="Addition" />
          <Column field="total_deduction" header="Deduction" />
          <Column field="total_tax" header="Tax" />
          <Column field="total_net_orion" header="Total Net Orion" />
          <Column field="employee_total_net" header="Total Net" />
        </DataTable>
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <Button label="Close" @click="showDetailsDialog = false"
        class="!bg-gray-600 !border-none !text-white hover:!bg-gray-500" />
    </div>
  </Dialog>

  <!-- Loading & Error -->
  <p v-if="loading" class="text-white text-center text-xl mb-2">Loading...</p>
  <p v-if="error" class="text-red-300 text-center">{{ error }}</p>

  <DataTable :value="payroll" rowHover :rowClass="rowClass" @rowSelect="onRowSelect" selectionMode="single" tableStyle="min-width: 50rem">
    <Column field="id" header="ID">
      <template #body="slotProps">
        <div class="flex flex-col">
          <p>{{ slotProps.data.id }}</p>
          <p class="text-xs text-gray-400">Emp id: {{ slotProps.data.employee_id }}</p>
        </div>
      </template>
    </Column>
    <Column field="employee_name" header=" Name">
      <template #body="slotProps">
        <div class="flex flex-col">
          <p>{{ slotProps.data.employee_name }}</p>
          <p class="text-xs text-gray-400">{{ slotProps.data.company_name }}</p>
          <p class="text-xs text-gray-400 ">@{{ slotProps.data.company_id }}</p>
        </div>
      </template>
    </Column>
    <Column field="batch_name" header="Batch Name">
      <template #body="slotProps">
        <div class="flex flex-col">
          <p>{{ slotProps.data.batch_name }}</p>
          <p class="text-xs text-gray-400">Status ( {{ slotProps.data.batch_status }} )</p>
        </div>
      </template>
    </Column>
    <Column field="employee_department" header="Department">
      <template #body="slotProps">
        <div class="flex flex-col">
          <p>{{ slotProps.data.employee_department }}</p>
          <p class="text-xs text-gray-400">Status ( {{ slotProps.data.employee_status }} )</p>
        </div>
      </template>
    </Column>
    <Column field="employee_leaves" header="Records">
      <template #body="slotProps">
        <div class="flex gap-2">
          <p class="text-sm text-gray-400">Leaves: {{ slotProps.data.employee_leaves }}</p>
          <p class="text-sm text-gray-400">Lates: {{ slotProps.data.employee_lates }}</p>
          <p class="text-sm text-gray-400">Early: {{ slotProps.data.employee_early }}</p>
        </div>
      </template>
    </Column>
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
import { useEmployeeShort } from '@/composables/Employee/useEmployeesShort';

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
const showDetailsDialog = ref(false);
// Selected row
const selected = ref(null);
const selectedPayrollRow = ref(null);

// Add form
const form = reactive({
 company_id: null, batch_name: '', batch_status: '', employee_lates: 0,
  employee_early: 0, employee_leaves: 0, employee_contract_hours: 0, employee_rota_hours: 0,
  employee_worked_hours: 0, employee_net_hours: 0, employee_over_below: 0, employee_score: 0,
  employee_basic_salary: 0, employee_hourly_rate: 0, total_addition: 0, total_deduction: 0,
  total_gross: 0, total_tax: 0, employee_total_net: 0, total_net_orion: 0
});

// Reset form function
const resetPayrollForm = () => {
  form.employee_id = null;
  form.company_id = null;
  form.batch_name = '';
  form.employee_lates = 0;
  form.employee_early = 0;
  form.employee_leaves = 0;
  form.employee_contract_hours = 0;
  form.employee_rota_hours = 0;
  form.employee_worked_hours = 0;
  createError.value = ``;
};

// Edit form

// Open edit dialog
const ShowDetails = (data) => {
  form.company_id = data.company_id;
  form.batch_name = data.batch_name;
  form.batch_status = data.batch_status;
  form.employee_lates = data.employee_lates;
  form.employee_early = data.employee_early;
  form.employee_leaves = data.employee_leaves;
  form.employee_contract_hours = data.employee_contract_hours;
  form.employee_rota_hours = data.employee_rota_hours;
  form.employee_worked_hours = data.employee_worked_hours;
  form.employee_net_hours = data.employee_net_hours;
  form.employee_over_below = data.employee_over_below;
  form.employee_score = data.employee_score;
  form.basic_salary = data.basic_salary;
  form.hourly_rate = data.hourly_rate;
  form.total_addition = data.total_addition;
  form.total_deduction = data.total_deduction;
  form.total_gross = data.total_gross;
  form.total_tax = data.total_tax;
  form.employee_total_net = data.employee_total_net;
  form.total_net_orion = data.total_net_orion;
  showUpdateDialog.value = true;
}


// Row styling
const rowClass = row =>
  selected.value && selected.value.employee_id === row.employee_id
    ? '!bg-gray-600 !text-white !border-none'
    : 'hover:!bg-gray-600 hover:!text-white';

// Add new payroll
const addPayroll = async () => {
  const payrollData = {
    employee_id: parseInt(form.employee_id),
    company_id: parseInt(form.company_id),
    batch_name: form.batch_name,
    employee_lates: parseInt(form.employee_lates),
    employee_early: parseInt(form.employee_early),
    employee_leaves: parseInt(form.employee_leaves),
    employee_contract_hours: parseInt(form.employee_contract_hours),
    employee_rota_hours: parseInt(form.employee_rota_hours),
    employee_worked_hours: parseInt(form.employee_worked_hours),
  };

  const response = await createPayroll(payrollData);
  if(response && response.success){
    AddPayrollDialog.value = false;
    resetPayrollForm();
    fetchPayroll();
  } else {
    createError.value = response.message || response.error
  }
}

// Delete payroll
const deleteForm = reactive({
 id: null, batch_name: ''
});

const ShowDelete = (data) =>{
  deleteForm.id = data.id;
  deleteForm.batch_name = data.batch_name;
  showDelete.value = true;
}
const DeletePayrollForm = async () => {
  if (!deleteForm) return;
  const getPayrollId = deleteForm.id;
  const response = await deletePayroll(getPayrollId);
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
  const basic_salary = form.basic_salary;

  const payrollData = { batch, employee_id, early, late, leaves, hourly_rate, worked_hours, monthly_hours, basic_salary };

  const response = await updatePayroll(payrollData);

  if (response && response.success){
    showUpdateDialog.value = false;
    fetchPayroll();
  } else {
    updatePayrollError.value = response.error || response.message;
  }
}

// Handle row selection
const onRowSelect = (event) => {
  selectedPayrollRow.value = event.data;
  showDetailsDialog.value = true;
}

// Load data on mount
onMounted(async () => {
  await fetchPayroll();
  await fetchEmployeesShort();
});
</script>
