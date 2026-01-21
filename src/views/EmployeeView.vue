<template>
  <div class="flex justify-end items-center px-6">
    <div class="relative !m-5">
      <InputText v-model="searchField" placeholder="Search..." class="pr-10" />
      <Button icon="pi pi-search"
        class="!absolute right-1 top-1/2 -translate-y-1/2 !p-2 !border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
    </div>
    <Button label="Refresh" @click="fetchemployees"
      class="!m-5 !border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
    <Button label="Add Employee" @click="showAddEmployee = true"
      class="!border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />

  </div>

  <DataTable :value="employee" tableStyle="min-width: 50rem" rowHover :rowClass="rowClass">
    <Column field="id" header="ID" />
    <Column field="employee_name" header="Name">
      <template #body="slotProps">
        <div class="flex flex-col">
          <p>{{ slotProps.data.employee_name }}</p>
          <p class="text-xs text-gray-400 font-semibold">Gender: {{ slotProps.data.employee_gender }}</p>
          <p class="text-xs text-gray-400">@{{ slotProps.data.employee_company_id }}</p>
        </div>
      </template>
    </Column>
    <Column field="employee_department" header="Department">
      <template #body="slotProps">
        <div class="flex flex-col">
          <p>{{ slotProps.data.employee_department }}</p>
          <p class="text-xs text-gray-400">{{ slotProps.data.employee_status }}</p>
        </div>
      </template>
    </Column>
    <Column field="employee_email" header="Email" />
    <Column field="employee_dob" header="Date of Birth" />
    <Column field="employee_cnic" header="Cnic" />
    <Column field="employee_phone_number_main" header="Phone Number">
      <template #body="slotProps">
        <div class="flex flex-col">
          <p>{{ slotProps.data.employee_phone_number_main }}</p>
          <p class="text-xs text-gray-400 ">Secondary ( {{ slotProps.data.employee_phone_number_secondary }} )</p>
        </div>
      </template>
    </Column>
    <Column field="employee_address_permanent" header="Address">
      <template #body="slotProps">
        <div class="flex flex-col">
          <p>{{ slotProps.data.employee_address_current }}</p>
          <p class="text-xs text-gray-400 ">Permanent ( {{ slotProps.data.employee_address_permanent }} )</p>
        </div>
      </template>
    </Column>
    <Column field="id" header="Actions">
      <template #body="slotProps">
        <div class="flex gap-2">
          <Button @click="showDetail(slotProps.data)"
            class="!bg-gray-600 !border-none !text-white hover:!bg-white hover:!text-gray-600">
            <span class="pi pi-pencil w-[20px]"></span>
          </Button>
          <Button @click="showDelete(slotProps.data)"
            class="!bg-gray-600 !border-none !text-white hover:!bg-white hover:!text-gray-600">
            <span class="pi pi-trash w-[20px]"></span>
          </Button>
        </div>
      </template>
    </Column>
  </DataTable>
   <div class="justify-center flex items-center h-[20vh]">
      <p v-if="employeeLoading" class="text-white text-center text-xl mb-2">Loading...</p>
      <p v-if="employeeError" class="text-red-300 text-center">{{ employeeError }}</p>
   </div>


  <!-- Update Dialog -->
  <Dialog v-model:visible="showUpdateDialog" @hide="resetForm" modal header="Update Employee"
    :style="{ width: '1000px' }">
    <div class="text-white space-y-2 mb-6">
      <div class="grid grid-cols-3 gap-3">
        <!-- Col 1 -->
        <div>
          <div>
            <label>Name</label>
            <InputText v-model="form.name" class="!w-full !mb-3" placeholder="Name" autocomplete="off" />
          </div>
          <div>
            <label>Company ID</label>
            <InputText v-model="form.companyId" class="!w-full !mb-3" placeholder="Company ID" autocomplete="off" />
          </div>
          <div>
            <label>Department</label>
            <Select v-model="form.department" :options="departmentOptions" optionLabel="label" optionValue="value" placeholder="Select Department" class="!w-full !mb-3" />
          </div>
          <div>
            <label>Gender</label>
            <Select v-model="form.gender" :options="genderOptions" optionLabel="label" optionValue="value" placeholder="Select Gender" class="!w-full !mb-3" />
          </div>
          <div>
            <label>Email</label>
            <InputText v-model="form.email" class="!w-full !mb-3" placeholder="Email" autocomplete="off" type="email" />
          </div>
        </div>
        <!-- Col 2 -->
        <div>
          <div>
            <label>Employee Status</label>
            <Select v-model="form.employeeStatus" :options="statusOptions" optionLabel="label" optionValue="value" placeholder="Select Status" class="!w-full !mb-3" />
          </div>
          <div>
            <label>CNIC</label>
            <InputText v-model="form.cnic" class="!w-full !mb-3" placeholder="CNIC" autocomplete="off" />
          </div>
          <div>
            <label>Date of Birth</label>
            <DatePicker v-model="form.dateOfBirth" class="!w-full !mb-3" placeholder="Date of Birth" />
          </div>
          <div>
            <label>Main Phone Number</label>
            <InputText v-model="form.mainPhoneNumber" class="!w-full !mb-3" placeholder="Main Phone" autocomplete="off" />
          </div>
          <div>
            <label>Secondary Phone Number</label>
            <InputText v-model="form.secondaryPhoneNumber" class="!w-full !mb-3" placeholder="Secondary Phone" autocomplete="off" />
          </div>
        </div>
        <!-- Col 3 -->
        <div>
          <div>
            <label>Current Address</label>
            <Textarea v-model="form.currentAddress" class="!w-full !mb-3" placeholder="Current Address" rows="3" />
          </div>
          <div>
            <label>Permanent Address</label>
            <Textarea v-model="form.permanentAddress" class="!w-full !mb-3" placeholder="Permanent Address" rows="3" />
          </div>
        </div>
      </div>
      <div v-if="updateEmployeeError" class="bg-red-800 w-full mx-auto  text-white p-2 rounded-md">
        <p class="text-left">{{ updateEmployeeError }}</p>
      </div>
    </div>
    <div class="flex gap-2 justify-between mt-4">
      <Button label="Close" @click="showUpdateDialog = false" class="!bg-gray-600 !border-none !text-white" />
      <Button label="Update" :loading="updateEmployeeLoading" @click="updateEmployeeForm()"
        class="!bg-gray-600 !border-none !text-white" />
    </div>
  </Dialog>


  <!-- Delete Dialog -->
  <Dialog v-model:visible="showDeleteDialog" modal header="Delete Employee" :style="{ width: '600px' }">
    <div v-if="selected" class="text-white space-y-2">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="test-xl font-semibold">Name :</label>
          <p>{{ form.name }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Company ID :</label>
          <p>{{ form.companyId }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Gender :</label>
          <p>{{ form.gender }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Main Phone :</label>
          <p>{{ form.mainPhoneNumber }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Secondary Phone :</label>
          <p>{{ form.secondaryPhoneNumber }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Employee Status :</label>
          <p>{{ form.employeeStatus }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">CNIC :</label>
          <p>{{ form.cnic }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Current Address :</label>
          <p>{{ form.currentAddress }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Permanent Address :</label>
          <p>{{ form.permanentAddress }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Email :</label>
          <p>{{ form.email }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Date of Birth :</label>
          <p>{{ form.dateOfBirth }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Department :</label>
          <p>{{ form.department }}</p>
        </div>
        <div v-if="deleteEmployeeError" class="bg-red-800 w-full mx-auto  text-white p-2 rounded-md col-span-2">
          <p class="text-left">{{ deleteEmployeeError }}</p>
        </div>
      </div>
    </div>
    <div class="flex gap-2 justify-between mt-4">
      <Button label="Close" @click="showDeleteDialog = false" class="!bg-gray-600 !border-none !text-white" />
      <Button label="Delete" :loading="deleteEmployeeLoading" @click="deleteEmployeeForm()"
        class="!bg-red-600 !border-none !text-white" />
    </div>
  </Dialog>

  <!-- Add employee -->
  <Dialog v-model:visible="showAddEmployee" @hide="resetForm" modal header="Create Employee"
    :style="{ width: '1000px' }">
    <div class="text-white space-y-2 mb-6">
      <div class="grid grid-cols-3  justify-center gap-3">
        <!-- Col 1 -->
        <div>
          <div>
            <label>Name</label>
            <InputText v-model="form.name" class="!w-full !mb-3" placeholder="Name" autocomplete="off" />
          </div>
          <div>
            <label>Company ID</label>
            <InputText v-model="form.companyId" class="!w-full !mb-3" placeholder="Company ID" autocomplete="off" />
          </div>
             <div>
            <label>Department</label>
            <Select v-model="form.department" :options="departmentOptions" optionLabel="label" optionValue="value" placeholder="Select Department" class="!w-full !mb-3" />
          </div>
          <div>
            <label>Gender</label>
            <Select v-model="form.gender" :options="genderOptions" optionLabel="label" optionValue="value" placeholder="Select Gender" class="!w-full !mb-3" />
          </div>
           <div>
            <label>Email</label>
            <InputText v-model="form.email" class="!w-full !mb-3" placeholder="Email" autocomplete="off" type="email" />
          </div>
        </div>
        <!-- Col 2 -->
        <div>
          <div>
            <label>Employee Status</label>
            <Select v-model="form.employeeStatus" :options="statusOptions" optionLabel="label" optionValue="value" placeholder="Select Status" class="!w-full !mb-3" />
          </div>
          <div>
            <label>CNIC</label>
            <InputText v-model="form.cnic" class="!w-full !mb-3" placeholder="CNIC" autocomplete="off" />
          </div>
             <div>
            <label>Date of Birth</label>
            <DatePicker v-model="form.dateOfBirth" class="!w-full !mb-3" placeholder="Date of Birth" />
          </div>
             <div>
            <label>Main Phone Number</label>
            <InputText v-model="form.mainPhoneNumber" class="!w-full !mb-3" placeholder="Main Phone" autocomplete="off" />
          </div>
          <div>
            <label>Secondary Phone Number</label>
            <InputText v-model="form.secondaryPhoneNumber" class="!w-full !mb-3" placeholder="Secondary Phone" autocomplete="off" />
          </div>


        </div>
        <!-- Col 3 -->
        <div>
          <div>
            <label>Basic Salary</label>
            <InputText v-model="form.employee_basic_salary" class="!w-full !mb-3" placeholder="Enter Basic Salary" autocomplete="off" />
          </div>
           <div>
            <label>Current Address</label>
            <Textarea v-model="form.currentAddress" class="!w-full !mb-3" placeholder="Current Address" autocomplete="off" />
          </div>
          <div>
            <label>Permanent Address</label>
            <Textarea v-model="form.permanentAddress" class="!w-full !mb-3" placeholder="Permanent Address" autocomplete="off" />
          </div>
        </div>
      </div>
      <div v-if="createEmployeeError" class="bg-red-800 w-full mx-auto text-white p-2 rounded-md">
        <p class="text-left">{{ createEmployeeError }}</p>
      </div>
    </div>
    <div class="flex gap-2 justify-between mt-4">
      <Button label="Cancel" @click="showAddEmployee = false" :disabled="createEmployeeLoading"
        class="!bg-gray-600 !border-none !text-white" />
      <Button label="Save" :loading="createEmployeeLoading" @click="addEmployee"
        class="!bg-white !text-[#0A0E17] !border-none" />
    </div>
  </Dialog>
</template>

<script setup>
// Import Vue and needed components
import { ref, onMounted } from 'vue'
import { useEmployee } from '@/composables/Employee/useEmployees'
import { useCreateEmployee } from '@/composables/Employee/useCreateEmployee'
import { useDeleteEmployee } from '@/composables/Employee/useDeleteEmployee'
import { useUpdateEmployee } from '@/composables/Employee/useUpdateEmployee'
import DataTable from 'primevue/datatable'
import DatePicker from 'primevue/datepicker'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'

// Gender and Status Options
const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
]

const statusOptions = [
  { label: 'Permanent', value: 'permanent' },
  { label: 'Trainee', value: 'trainee' },
]

const departmentOptions = [
  { label: 'Management', value:'management'},
  { label:'Maintenance', value:'maintenance'}
]

// State and composables
const { employee, loading: employeeLoading, fetchemployees } = useEmployee()
const { createEmployee, loading: createEmployeeLoading, error: createEmployeeError } = useCreateEmployee()
const { deleteEmployee, loading: deleteEmployeeLoading, error: deleteEmployeeError } = useDeleteEmployee()
const { updateEmployee, loading: updateEmployeeLoading, error: updateEmployeeError } = useUpdateEmployee()

// Variable Defined
const selected = ref({})
const showDeleteDialog = ref(false)
const searchField = ref('')
const showAddEmployee = ref(false)
const showUpdateDialog = ref(false)
const employeeError = ref(null);
const form = ref({
  id: '',
  email: '',
  name: '',
  companyId: '',
  gender: '',
  mainPhoneNumber: '',
  secondaryPhoneNumber: '',
  employeeStatus: '',
  cnic: '',
  currentAddress: '',
  permanentAddress: '',
  dateOfBirth: '',
  department: ''
})

// Show Detail Function Placeholders
const showDetail = (data) => {
  form.value.id = data.id || '';
  form.value.name = data.employee_name || '';
  form.value.email = data.employee_email || '';
  form.value.companyId = data.employee_company_id || '';
  form.value.gender = data.employee_gender || '';
  form.value.mainPhoneNumber = data.employee_phone_number_main || '';
  form.value.secondaryPhoneNumber = data.employee_phone_number_secondary || '';
  form.value.employeeStatus = data.employee_status || '';
  form.value.cnic = data.employee_cnic || '';
  form.value.currentAddress = data.employee_address_current || '';
  form.value.permanentAddress = data.employee_address_permanent || '';
  form.value.dateOfBirth = data.employee_dob || '';
  form.value.department = data.employee_department || '';
  form.value.employee_basic_salary = data.employee_basic_salary || '';
  showUpdateDialog.value = true;
}

// Add employee
const addEmployee = async () => {
  const employeeData = {
    employee_name: form.value.name,
    employee_email: form.value.email,
    employee_company_id: form.value.companyId,
    employee_gender: form.value.gender,
    employee_phone_number_main: form.value.mainPhoneNumber,
    employee_phone_number_secondary: form.value.secondaryPhoneNumber,
    employee_status: form.value.employeeStatus,
    employee_cnic: form.value.cnic,
    employee_address_current: form.value.currentAddress,
    employee_address_permanent: form.value.permanentAddress,
    employee_dob: form.value.dateOfBirth,
    employee_department: form.value.department,
    employee_basic_salary: form.value.employee_basic_salary
  };
  const response = await createEmployee(employeeData);
  if (response && response.success) {
    showAddEmployee.value = false;
    resetForm();
    fetchemployees();
  } else {
    createEmployeeError.value = response.error;
  }
}


// Delete employee
const showDelete = (data) => {
  form.value.id = data.id || '';
  form.value.name = data.employee_name || '';
  form.value.email = data.employee_email || '';
  form.value.companyId = data.employee_company_id || '';
  form.value.gender = data.employee_gender || '';
  form.value.mainPhoneNumber = data.employee_phone_number_main || '';
  form.value.secondaryPhoneNumber = data.employee_phone_number_secondary || '';
  form.value.employeeStatus = data.employee_status || '';
  form.value.cnic = data.employee_cnic || '';
  form.value.currentAddress = data.employee_address_current || '';
  form.value.permanentAddress = data.employee_address_permanent || '';
  form.value.dateOfBirth = data.employee_dob || '';
  form.value.department = data.employee_department || '';
  form.value.employee_basic_salary = data.employee_basic_salary || '';
  showDeleteDialog.value = true;
}
const deleteEmployeeForm = async () => {
  if (!form.value) return;

  const id = form.value.id;
  const response = await deleteEmployee(id);

  if (response && response.success) {
    showDeleteDialog.value = false;
    fetchemployees();
    resetForm();
  } else {
    console.log(response.error);
    deleteEmployeeError.value = response.error;
  }
}

// Update employee
const updateEmployeeForm = async () => {
  if (!form.value) return;
  const employeeData = {
    id: form.value.id,
    employee_name: form.value.name,
    employee_email: form.value.email,
    employee_company_id: form.value.companyId,
    employee_gender: form.value.gender,
    employee_phone_number_main: form.value.mainPhoneNumber,
    employee_phone_number_secondary: form.value.secondaryPhoneNumber,
    employee_status: form.value.employeeStatus,
    employee_cnic: form.value.cnic,
    employee_address_current: form.value.currentAddress,
    employee_address_permanent: form.value.permanentAddress,
    employee_dob: form.value.dateOfBirth,
    employee_department: form.value.department,
    employee_basic_salary: form.value.employee_basic_salary
  };
  const response = await updateEmployee(employeeData);
  if (response && response.success) {
    showUpdateDialog.value = false;
    resetForm();
    fetchemployees();
  } else {
    updateEmployeeError.value = response.error;
  }
}
const resetForm = () => {
  if (form.value) {
    form.value.id = '';
    form.value.name = '';
    form.value.email = '';
    form.value.companyId = '';
    form.value.gender = '';
    form.value.mainPhoneNumber = '';
    form.value.secondaryPhoneNumber = '';
    form.value.employeeStatus = '';
    form.value.cnic = '';
    form.value.currentAddress = '';
    form.value.permanentAddress = '';
    form.value.dateOfBirth = '';
    form.value.department = '';
    form.value.employee_basic_salary = '';
  }
  updateEmployeeError.value = '';
  deleteEmployeeError.value = '';
  createEmployeeError.value = '';
}

// Row highlight
const rowClass = row =>
  selected.value && selected.value.employee_name === row.employee_name
    ? '!bg-gray-600 !text-white !border-none'
    : 'hover:!bg-gray-600 hover:!text-white'

// Fetch employees on mtoun
onMounted(async () => {
  const getResponse = await fetchemployees();
  if (getResponse && !getResponse.success) {
    employeeError.value = getResponse.error;
  }
})
</script>
