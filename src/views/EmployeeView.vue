<template>
  <!-- Employee Header -->
  <div class="flex items-center py-4 justify-between px-4">
    <div>
      <h2 class="text-white font-bold text-3xl ">Employees</h2>
      <p class="text-white/85 text-sm">Showing 153 results.</p>
    </div>
    <div>
      <div class="flex gap-4">
        <InputText placeholder="Search Employee" class="!bg-gray-700 !w-[270px] !border-gray-400 rounded !text-white" />
        <Select v-model="employees" :options="countries" filter optionLabel="name" placeholder="All Companies"
          class="w-full md:w-56 !bg-gray-700 !border-gray-400 rounded">
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>{{ slotProps.placeholder }}</span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Select>
        <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Active" class="w-full md:w-56 !bg-gray-700 !border-gray-400 rounded !text-white" />

        <Button class="!bg-gray-500 !font-bold px-4 !border-none !py-2 rounded hover:!bg-gray-300"><span
            class="pi pi-check"></span> Add
          Employee</Button>
        <Button class="!bg-gray-500 px-4 !border-none rounded hover:!bg-gray-300"><a href="/attendance"><span
              class="pi pi-refresh"></span></a></Button>
      </div>
    </div>
  </div>

  <!-- Loading and Error Messages -->
  <p v-if="loading" class="text-gray-300 text-center mt-4">Loading employees...</p>
  <p v-if="error" class="text-red-400 text-center mt-4">{{ error }}</p>

  <!-- Employee Data Table -->
  <DataTable v-if="!loading" :value="employees">
    <Column header="Employee">
      <template #body="slotProps">
        <div class="flex items-center gap-4">
          <img :src="slotProps.data.employee_photo_url || profile" :alt="slotProps.data.employee_name"
            class="w-[46px] h-[50px] !bg-gray-500 object-cover rounded-[3px]" />
          <div>
            <p class="text-white font-semibold">
              {{ slotProps.data.employee_name }}
            </p>
            <p class="text-gray-600 text-sm">
              {{ slotProps.data.company.company_name_short }}
            </p>
            <p class="text-gray-600 text-sm">
              @{{ slotProps.data.employee_id }}
            </p>
          </div>
        </div>
      </template>
    </Column>

    <Column header="Department">
      <template #body="slotProps">
        <div class="text-white">{{ slotProps.data.employee_department }}</div>
        <div class="text-gray-600 text-sm">{{ slotProps.data.employee_status }}</div>
      </template>
    </Column>

    <Column header="Joined">
      <template #body="slotProps">
        <div class="text-white">{{ slotProps.data.employee_join_date }}</div>
        <div class="text-gray-600 text-sm">{{ slotProps.data.employee_contract_date }}</div>
      </template>
    </Column>

    <Column header="Badge ID">
      <template #body="slotProps">
        <div class="text-white">Badge #{{ slotProps.data.employee_badge_id }}</div>
        <div class="text-gray-600 text-sm">Pin #{{ slotProps.data.employee_badge_pin }}</div>
      </template>
    </Column>

    <Column header="Tenant">
      <template #body="slotProps">
        <div class="text-white text-sm">{{ slotProps.data.tenant_id }}</div>
      </template>
    </Column>

    <Column header="Phone">
      <template #body="slotProps">
        <div class="text-white text-sm">
          {{ slotProps.data.employee_phone_number_main }}
        </div>
      </template>
    </Column>

    <Column header="Next of Kin">
      <template #body="slotProps">
        <div class="text-white">{{ slotProps.data.employee_next_of_kin_number }}</div>
        <div class="text-gray-600 text-sm">{{ slotProps.data.employee_next_of_kin }}</div>
      </template>
    </Column>

  </DataTable>
</template>

<script setup>
import { onMounted } from "vue";
import { useEmployee } from "@/composables/useEmployee";
import Select from 'primevue/select';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import profile from '@/assets/images/profile.png'


const { employees, loading, error, fetchEmployees } = useEmployee();

onMounted(() => {
  fetchEmployees();
});
</script>
