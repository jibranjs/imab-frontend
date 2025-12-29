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
  <p v-if="employeeLoading" class="text-white text-center text-xl mb-2">Loading...</p>
  <p v-if="employeeError" class="text-red-300 text-center">{{ employeeError }}</p>
  <DataTable :value="employee" tableStyle="min-width: 50rem" rowHover :rowClass="rowClass">
    <Column field="id" header="ID" />
    <Column field="name" header="Name" />
    <Column field="username" header="Username" />
    <Column field="role" header="Role" />
    <Column field="email" header="Email" />
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

  <!-- Update Dialog -->
  <Dialog v-model:visible="showUpdateDialog" modal header="Employee Details" :style="{ width: '400px' }">
    <div class="text-white space-y-2 mb-6">
      <div class="flex flex-col gap-3">
        <div>
          <label>Name</label>
          <InputText label="Name" v-model="form.name" class="!w-full" />
        </div>
        <div>
          <label>Username</label>
          <InputText label="Username" v-model="form.username" class="!w-full" />
        </div>
        <div>
          <label>Password</label>
          <InputText label="Password" v-model="form.password" class="!w-full" />
        </div>
        <div>
          <label>Role</label>
          <InputText label="Role" v-model="form.role" class="!w-full" />
        </div>
        <div>
          <label>Email</label>
          <InputText label="Email" v-model="form.email" class="!w-full" />
        </div>
        <div v-if="updateEmployeeError" class="bg-red-500 text-white p-2 rounded-md">
          <p class="text-red-300 text-center">{{ updateEmployeeError }}</p>
        </div>
      </div>
    </div>
    <div class="flex gap-2 justify-between mt-4">
      <Button label="Close" @click="showUpdateDialog = false" class="!bg-gray-600 !border-none !text-white" />
      <Button label="Update" :loading="updateEmployeeLoading" @click="updateEmployeeForm()"
        class="!bg-gray-600 !border-none !text-white" />
    </div>
  </Dialog>


  <!-- Delete Dialog -->
  <Dialog v-model:visible="showDeleteDialog" modal header="Delete Employee" :style="{ width: '400px' }">
    <div v-if="selected" class="text-white space-y-2">
      <div class="flex flex-col gap-3">
        <div>
          <label class="test-xl font-semibold">Name :</label>
          <p>{{ form.name }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Username :</label>
          <p>{{ form.username }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Password :</label>
          <p>{{ form.password }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Role :</label>
          <p>{{ form.role }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Email :</label>
          <p>{{ form.email }}</p>
        </div>
        <div v-if="deleteEmployeeError" class="bg-red-500 text-white p-2 rounded-md">
          <p class="text-red-300 text-center">{{ deleteEmployeeError }}</p>
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
  <Dialog v-model:visible="showAddEmployee" modal header="Create Employee" :style="{ width: '500px' }">
    <div class="text-white space-y-2 mb-6">
      <div class="flex flex-col items-center justify-center gap-6">
        <!-- Col 1 -->
        <div>
          <div>
            <label>Name</label>
            <InputText v-model="form.name" class="!w-full !mb-3" placeholder="name" autocomplete="off" />
          </div>
          <div>
            <label>Username</label>
            <InputText v-model="form.username" class="!w-full !mb-3" placeholder="username" autocomplete="off" />
          </div>
          <div>
            <label>Password</label>
            <InputText v-model="form.password" class="!w-full !mb-3" placeholder="password" autocomplete="off" />
          </div>
          <div>
            <label>Role</label>
            <InputText v-model="form.role" class="!w-full !mb-3" placeholder="role" autocomplete="off" />
          </div>
          <div>
            <label>Email</label>
            <InputText v-model="form.email" class="!w-full !mb-3" placeholder="email" autocomplete="off" />
          </div>
        </div>


      </div>
      <div v-if="createEmployeeError" class="bg-red-500 text-white p-2 rounded-md">
        <p class="text-red-300 text-center">{{ createEmployeeError }}</p>
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
import { useEmployee } from '@/composables/useEmployees'
import { useCreateEmployee } from '@/composables/useCreateEmployee'
import { useDeleteEmployee } from '@/composables/useDeleteEmployee'
import { useUpdateEmployee } from '@/composables/useUpdateEmployee'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

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
const form = ref({ username: '', email: '', name: '', role: '', password: '' })

// Show employee details in Update dialog
const showDetail = (data) => {
  form.value.name = data.name;
  form.value.username = data.username;
  form.value.password = data.password;
  form.value.role = data.role;
  form.value.email = data.email;
  showUpdateDialog.value = true;
}
// Add employee
const addEmployee = async () => {
  const name = form.value.name;
  const username = form.value.username;
  const password = form.value.password;
  const role = form.value.role;
  const email = form.value.email;

  const employeeData = {
    name,
    username,
    password,
    role,
    email
  };
  const response = await createEmployee(employeeData);
  if (response && response.success) {
    showAddEmployee.value = false;
    form.value.name = '';
    form.value.username = '';
    form.value.password = '';
    form.value.role = '';
    form.value.email = '';
    fetchemployees();
  } else {
    createEmployeeError.value = response.error;
  }
}

// Delete employee
const showDelete = (data) => {
  form.value.name = data.name;
  form.value.username = data.username;
  form.value.password = data.password;
  form.value.role = data.role;
  form.value.email = data.email;
  showDeleteDialog.value = true;
}
const deleteEmployeeForm = async () => {
  if (!form.value) return;

  const username = form.value.username;
  const response = await deleteEmployee(username);

  if (response && response.success) {
    showDeleteDialog.value = false;
    fetchemployees();
  } else {
    deleteEmployeeError.value = response.error;
  }

}

// Update employee
const updateEmployeeForm = async () => {

  if (!form.value) return;

  const name = form.value.name;
  const username = form.value.username;
  const password = form.value.password;
  const role = form.value.role;
  const email = form.value.email;
  const employeeData = {
    name,
    username,
    password,
    role,
    email
  };
  const response = await updateEmployee(employeeData);
  if (response && response.success) {
    showUpdateDialog.value = false;
    fetchemployees();
  } else {
    updateEmployeeError.value = response.error;
  }
}

// Row highlight
const rowClass = row =>
  selected.value && selected.value.username === row.username
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
