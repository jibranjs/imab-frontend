<template>
  <div class="flex justify-end items-center px-6">
    <div class="relative !m-5">
      <InputText v-model="globalFilter" placeholder="Search..." class="pr-10" @keyup.enter="doSearch" />
      <Button icon="pi pi-search" @click="doSearch"
        class="!absolute right-1 top-1/2 -translate-y-1/2 !p-2 !border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
    </div>
    <Button label="Refresh" @click="fetchemployees"
      class="!m-5 !border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
    <Button label="Add Employee" @click="showAdd = true"
      class="!border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />

  </div>
  <p v-if="loading" class="text-white text-center text-xl mb-2">Loading...</p>
  <p v-if="error" class="text-red-300 text-center">{{ error }}</p>
  <DataTable v-model:selection="selected" selectionMode="single" :value="filteredEmployees"
    tableStyle="min-width: 50rem" rowHover :rowClass="rowClass">
    <Column field="id" header="ID" />
    <Column field="name" header="Name" />
    <Column field="username" header="Username" />
    <Column field="password" header="Password" />
    <Column field="role" header="Role" />
    <Column field="email" header="Email" />
    <Column field="id" header="Actions">
      <template #body>
        <div class="flex gap-2" v-if="selected">
          <Button @click="showDetail = true"
            class="!bg-gray-600 !border-none !text-white hover:!bg-white hover:!text-gray-600">
            <span class="pi pi-pencil w-[20px]"></span>
          </Button>
          <Button @click="showDelete = true"
            class="!bg-gray-600 !border-none !text-white hover:!bg-white hover:!text-gray-600">
            <span class="pi pi-trash w-[20px]"></span>
          </Button>
        </div>
      </template>
    </Column>
  </DataTable>


  <!-- Detail Dialog -->
  <Dialog v-model:visible="showDetail" modal header="Employee Details" :style="{ width: '400px' }">
    <div v-if="selected" class="text-white space-y-2 mb-6">
      <div class="flex flex-col gap-3">
        <div>
          <label>Name</label>
          <InputText label="Name" v-model="selected.name" class="!w-full" />
        </div>
        <div>
          <label>Username</label>
          <InputText label="Username" :value="selected.username" class="!w-full" />
        </div>
        <div>
          <label>Password</label>
          <InputText label="Password" :value="selected.password" class="!w-full" />
        </div>
        <div>
          <label>Role</label>
          <InputText label="Role" :value="selected.role" class="!w-full" />
        </div>
        <div>
          <label>Email</label>
          <InputText label="Email" :value="selected.email" class="!w-full" />
        </div>
      </div>
    </div>
    <div class="flex gap-2 justify-between mt-4">
      <Button label="Close" @click="showDetail = false" class="!bg-gray-600 !border-none !text-white" />
      <Button label="Update" @click="updateEmployeeForm(selected)" class="!bg-gray-600 !border-none !text-white" />
    </div>
  </Dialog>



  <!-- Delete Dialog -->
  <Dialog v-model:visible="showDelete" modal header="Employee Details" :style="{ width: '400px' }">
    <div v-if="selected" class="text-white space-y-2">
      <div class="flex flex-col gap-3">
        <div>
          <label class="test-xl font-semibold">Name :</label>
          <p>{{ selected.name }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Username :</label>
          <p>{{ selected.username }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Password :</label>
          <p>{{ selected.password }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Role :</label>
          <p>{{ selected.role }}</p>
        </div>
        <div>
          <label class="test-xl font-semibold">Email :</label>
          <p>{{ selected.email }}</p>
        </div>
      </div>
    </div>
    <div class="flex gap-2 justify-between mt-4">
      <Button label="Close" @click="showDelete = false" class="!bg-gray-600 !border-none !text-white" />
      <Button label="Delete" @click="deleteEmployeeForm(selected)" class="!bg-red-600 !border-none !text-white" />
    </div>
  </Dialog>

  <!-- Add employee -->
  <Dialog v-model:visible="showAdd" modal header="Create Employee" :style="{ width: '400px' }">
    <div class="text-white space-y-2 mb-6">
      <div class="flex flex-col gap-3">
        <div>
          <label>Name</label>
          <InputText v-model="form.name" class="!w-full" placeholder="name" autocomplete="off" />
        </div>
        <div>
          <label>Username</label>
          <InputText v-model="form.username" class="!w-full" placeholder="username" autocomplete="off" />
        </div>
        <div>
          <label>Password</label>
          <InputText v-model="form.password" class="!w-full" placeholder="password" autocomplete="off" />
        </div>
        <div>
          <label>Role</label>
          <InputText v-model="form.role" class="!w-full" placeholder="role" autocomplete="off" />
        </div>
        <div>
          <label>Email</label>
          <InputText v-model="form.email" class="!w-full" placeholder="email" autocomplete="off" />
        </div>
      </div>
    </div>
    <div class="flex gap-2 justify-between mt-4">
      <Button label="Cancel" @click="showAdd = false" class="!bg-gray-600 !border-none !text-white" />
      <Button label="Save" @click="addEmployee" class="!bg-white !text-[#0A0E17] !border-none" />
    </div>
  </Dialog>
</template>

<script setup>
// Import Vue and needed components
import { ref, onMounted, watch } from 'vue'
import { useEmployee } from '@/composables/useEmployees'
import { useCreateEmployee } from '@/composables/useCreateEmployee'
import { useDeleteEmployee } from '@/composables/useDeleteEmployee'
import { useUpdateEmployee } from '@/composables/useUpdateEmployee'
import { useSearch } from '@/composables/useSearch'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

// State and composables
const { employee, loading, error, fetchemployees } = useEmployee()
const { createEmployee } = useCreateEmployee()
const { deleteEmployee } = useDeleteEmployee()
const { updateEmployee } = useUpdateEmployee()
const { results, searchEmployees } = useSearch()

// UI state
const selected = ref(null)
const showDetail = ref(false)
const showDelete = ref(false)
const showAdd = ref(false)
const globalFilter = ref('')
const form = ref({ username: '', email: '', name: '', role: '', password: '' })

const filteredEmployees = ref(employee.value)

// Search employees by name
const doSearch = async () => {
  if (!globalFilter.value) {
    await fetchemployees();
    filteredEmployees.value = employee.value;
    return;
  }
  await searchEmployees(globalFilter.value);
  filteredEmployees.value = results.value.filter(r =>
    String(r.name || '').toLowerCase().includes(globalFilter.value.toLowerCase())
  );
}

// Refresh list when search is cleared
watch(globalFilter, async (newValue, oldValue) => {
  const searchCleared = !newValue && oldValue;

  if (searchCleared) {
    await fetchemployees();
    filteredEmployees.value = employee.value;
  }
})

// Keep filteredEmployees in sync
watch(employee, (newValue) => {
  const noSearchActive = !globalFilter.value;

  if (noSearchActive) {
    filteredEmployees.value = newValue;
  }
})

// Add new employee
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

  await createEmployee(employeeData);
  showAdd.value = false;
  form.value.name = '';
  form.value.username = '';
  form.value.password = '';
  form.value.role = '';
  form.value.email = '';
  fetchemployees();
}

const updateEmployeeForm = async (fields) => {
  if (!fields) return;

  const name = fields.name;
  const username = fields.username;
  const password = fields.password;
  const role = fields.role;
  const email = fields.email;

  const employeeData = {
    name,
    username,
    password,
    role,
    email
  };

  await updateEmployee(employeeData);
  showDetail.value = false;
  fetchemployees();
}


const deleteEmployeeForm = async (fields) => {
  if (!fields) return;

  const username = fields.username;

  await deleteEmployee(username);
  showDelete.value = false;
  fetchemployees();
}

// Row highlight
const rowClass = row =>
  selected.value && selected.value.username === row.username
    ? '!bg-gray-600 !text-white !border-none'
    : 'hover:!bg-gray-600 hover:!text-white'

// Fetch employees on mtoun
onMounted(fetchemployees)
</script>
