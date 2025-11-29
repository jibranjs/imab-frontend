<template>
  <div class="flex justify-end items-center px-6">
    <InputText v-model="globalFilter" placeholder="Search..." class="!m-5" />
    <Button label="Refresh" @click="fetchemployees"
      class="!m-5 !border-none hover:!bg-white hover:!text-gray-600 !bg-gray-600" />
    <Button label="Add Employee" @click="visible = true"
      class="!border-none hover:!bg-white hover:!text-gray-600 !bg-gray-600" />
  </div>
  <p v-if="loading" class="text-white text-center text-xl mb-2">Loading...</p>
  <p v-if="error" class="text-red-300 text-center">{{ error }}</p>
  <DataTable :value="employee" tableStyle="min-width: 50rem">
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="username" header="Username"></Column>
    <Column field="password" header="Password"></Column>
    <Column field="role" header="Role"></Column>
    <Column field="email" header="Email"></Column>
        <!-- Action column with conditional close button -->
    <Column header="Actions">
      <template #body="slotProps">
        <!-- Only show the button if the username exists -->
        <Button
          v-if="slotProps.data.username"
          class="hover:!bg-red-600 !border-none !bg-gray-600 !text-white"
          @click="openDeleteConfirm(slotProps.data.username)"
        >
          <span class="pi pi-times"></span>
        </Button>
      </template>
    </Column>

  </DataTable>

  <!-- Dialog -->
  <div class="card flex shadow-xl justify-center">
    <Dialog v-model:visible="visible" modal header="Create Employee" :style="{ width: '370px' }">
      <div class="flex flex-col w-24 gap-4 mb-4">
        <label for="username" class="font-semibold w-full text-white">Username</label>
        <InputText id="username" v-model="username" class="flex-auto" placeholder="Username" autocomplete="off" />
      </div>
      <div class="flex flex-col w-24 gap-4 mb-8">
        <label for="email" class="font-semibold w-full text-white">Email</label>
        <InputText id="email" v-model="email"  class="flex-auto" placeholder="Email Address" autocomplete="off" />
      </div>
      <div class="flex flex-col w-24 gap-4 mb-4">
        <label for="name" class="font-semibold w-full text-white">Name</label>
        <InputText id="name" v-model="name" class="flex-auto" placeholder="name" autocomplete="off" />
      </div>
      <div class="flex flex-col w-24 gap-4 mb-4">
        <label for="role" class="font-semibold w-full text-white">Role</label>
        <InputText id="role" v-model="role" class="flex-auto" placeholder="role" autocomplete="off" />
      </div>
      <div class="flex flex-col w-24 gap-4 mb-4">
        <label for="password" class="font-semibold w-full text-white">Password</label>
        <InputText id="password" v-model="password" class="flex-auto" placeholder="password" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false" class="!bg-gray-600 hover:!bg-red-300 !border-none !text-[#0A0E17]"></Button>
        <Button type="button" label="Save" @click="createEmployeeHandler" class="!bg-white !border-none hover:bg-success"></Button>
      </div>
    </Dialog>
  </div>
  <!-- Delete confirmation dialog -->
  <Dialog header="Confirm delete" v-model:visible="deleteVisible" :modal="true" :closable="false" :style="{ width: '400px' }">
    <div class="text-white mb-4">Are you sure you want to delete <strong>{{ deleteTarget }}</strong>?</div>
    <div class="flex justify-end gap-2 mt-4">
      <Button label="Cancel" severity="secondary" @click="cancelDelete" class="!bg-gray-600 hover:!bg-red-300 !border-none !text-[#0A0E17]"></Button>
      <Button :loading="deleteLoading" label="Delete" severity="danger" @click="confirmDelete" class="!bg-red-600 !border-none !text-white"></Button>
    </div>
  </Dialog>
</template>
<script setup>
import { useEmployee } from '@/composables/useEmployees'
import { useCreateEmployee } from '@/composables/useCreateEmployee'
import { useDeleteEmployee } from '@/composables/useDeleteEmployee'
import { ref, onMounted, computed } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const visible = ref(false);
const username = ref('');
const email = ref('');
const name = ref('');
const role = ref('');
const password = ref('');
const globalFilter = ref('')

const createEmployeeHandler = async () => {

  const formData = () => {
    return {
      username: username.value,
      email: email.value,
      name: name.value,
      role: role.value,
      password: password.value
    }
  }

  await createEmployee(formData())
  visible.value = false
  // Clear form fields
  username.value = ''
  email.value = ''
  name.value = ''
  role.value = ''
  password.value = ''
  // Refresh employee list
  fetchemployees()
}

const { employee, loading, error, fetchemployees } = useEmployee()
const { createEmployee } = useCreateEmployee()
const { deleteEmployee: apiDeleteEmployee, loading: deleteLoading } = useDeleteEmployee()

const deleteTarget = ref(null)
const deleteVisible = computed({
  get: () => !!deleteTarget.value,
  set: (v) => { if (!v) deleteTarget.value = null }
})

const openDeleteConfirm = (username) => { deleteTarget.value = username }
const cancelDelete = () => { deleteTarget.value = null }

const confirmDelete = async () => {
  const u = deleteTarget.value
  if (!u) return
  const res = await apiDeleteEmployee(u)
  if (res?.success) {
    employee.value = employee.value.filter(e => e.username !== u)
    deleteTarget.value = null
  } else {
    alert(res?.error || 'Failed to delete employee.')
  }
}

onMounted(() => {
  fetchemployees()
})

</script>
