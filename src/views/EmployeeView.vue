<template>
  <div class="flex justify-end items-center px-6">
    <div class="relative !m-5">
      <InputText v-model="globalFilter" placeholder="Search..." class="pr-10" @keyup.enter="doSearch" />
      <Button icon="pi pi-search" @click="doSearch" class="!absolute right-1 top-1/2 -translate-y-1/2 !p-2 !border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
    </div>
    <Button label="Refresh" @click="fetchemployees" class="!m-5 !border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
    <Button label="Add Employee" @click="showAdd = true" class="!border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
  </div>
  <p v-if="loading" class="text-white text-center text-xl mb-2">Loading...</p>
  <p v-if="error" class="text-red-300 text-center">{{ error }}</p>
  <DataTable v-model:selection="selected" selectionMode="single" :value="filteredEmployees" tableStyle="min-width: 50rem" @rowSelect="showDetail = true" rowHover :rowClass="rowClass">
    <Column field="id" header="ID" />
    <Column field="name" header="Name" />
    <Column field="username" header="Username" />
    <Column field="password" header="Password" />
    <Column field="role" header="Role" />
    <Column field="email" header="Email" />
  </DataTable>


  <!-- Detail Dialog -->
  <Dialog v-model:visible="showDetail" modal header="Employee Details" :style="{ width: '400px' }">
    <div v-if="selected" class="text-white space-y-2">
      <div v-for="(value, key) in selected" :key="key">
        <strong>{{ key }}:</strong> {{ value }}
      </div>
    </div>
    <div class="flex gap-2 justify-between mt-4">
      <div>
        <Button @click="openEditDialog" class="!bg-[#1F2937] !border-none !text-white">
          <span class="pi pi-pencil"></span>
        </Button>
        <Button icon="pi pi-trash" @click="deleteRow" class="!bg-[#1F2937] !text-red-500 !border-none" />
      </div>
      <Button label="Close" @click="showDetail = false" class="!bg-gray-600 !border-none !text-white" />
    </div>
  </Dialog>

  <!-- Edit Employee Dialog -->
  <Dialog v-model:visible="showEdit" modal header="Edit Employee" :style="{ width: '370px' }">
    <div v-if="editEmployee" class="space-y-4">
      <div v-for="field in fields" :key="field" class="flex flex-col gap-1 mb-2">
        <label :for="'edit-'+field" class="font-semibold text-white">
          {{ field.charAt(0).toUpperCase() + field.slice(1) }}
        </label>
        <InputText :id="'edit-'+field" v-model="editEmployee[field]" :placeholder="field" />
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <Button label="Cancel" @click="showEdit = false" class="!bg-gray-600 !border-none !text-white" />
      <Button label="Save" @click="saveEdit" class="!bg-white !text-[#0A0E17] !border-none bg-success" />
    </div>
  </Dialog>

  <!-- Add employee -->
  <Dialog v-model:visible="showAdd" modal header="Create Employee" :style="{ width: '370px' }">
    <div v-for="field in fields" :key="field" class="flex flex-col w-24 gap-4 mb-4">
      <label :for="field" class="font-semibold w-full text-white">{{ field.charAt(0).toUpperCase() + field.slice(1) }}</label>
      <InputText :id="field" v-model="form[field]" class="flex-auto" :placeholder="field" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" @click="showAdd = false" class="!bg-gray-600 hover:!bg-red-300 !border-none !text-[#0A0E17]" />
      <Button label="Save" @click="addEmployee" class="!bg-white !text-[#0A0E17] !border-none bg-success" />
    </div>
  </Dialog>
</template>

<script setup>
// Import Vue and needed components
import { ref, onMounted, watch } from 'vue'
import { useEmployee } from '@/composables/useEmployees'
import { useCreateEmployee } from '@/composables/useCreateEmployee'
import { useDeleteEmployee } from '@/composables/useDeleteEmployee'
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
const { results, searchEmployees } = useSearch()

// UI state
const selected = ref(null)
const showDetail = ref(false)
const showAdd = ref(false)
const showEdit = ref(false)
const globalFilter = ref('')
const fields = ['username', 'email', 'name', 'role', 'password']
const form = ref({ username: '', email: '', name: '', role: '', password: '' })
const editEmployee = ref(null)

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
watch(globalFilter, async (val, oldVal) => {
  if (!val && oldVal) {
    await fetchemployees();
    filteredEmployees.value = employee.value;
  }
})

// Keep filteredEmployees in sync
watch(employee, (val) => {
  if (!globalFilter.value) filteredEmployees.value = val;
})

// Add employee
const addEmployee = async () => {
  await createEmployee({ ...form.value })
  showAdd.value = false
  Object.keys(form.value).forEach(k => form.value[k] = '')
  fetchemployees()
}

// Delete employee
const deleteRow = async () => {
  if (!selected.value?.username) return
  const res = await deleteEmployee(selected.value.username)
  if (res?.success) {
    employee.value = employee.value.filter(e => e.username !== selected.value.username)
    showDetail.value = false
    selected.value = null
  } else {
    alert(res?.error || 'Failed to delete employee.')
  }
}

// Open edit dialog and fill with selected employee
function openEditDialog() {
  if (!selected.value) return
  editEmployee.value = { ...selected.value }
  showDetail.value = false
  showEdit.value = true
}

function saveEdit() {
  if (!editEmployee.value) return

  const idx = employee.value.findIndex(e => e.username === editEmployee.value.username)
  if (idx !== -1) {
    employee.value[idx] = { ...editEmployee.value }
    selected.value = { ...editEmployee.value }
  }
  showEdit.value = false
}

// Row highlight
const rowClass = row =>
  selected.value && selected.value.username === row.username
    ? '!bg-gray-600 !text-white !border-none'
    : 'hover:!bg-gray-600 hover:!text-white'

// Fetch employees on mtoun
onMounted(fetchemployees)
</script>
