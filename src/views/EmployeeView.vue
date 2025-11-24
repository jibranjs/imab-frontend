<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import EmployeeHeader from '@/components/layout/EmployeeComponents/employeeHeader.vue';
import { data } from '@/Data/EmployeeData';

const informations = data
</script>
<template>
  <EmployeeHeader />
   <DataTable :value="informations">
            <Column header="Employee">
            <template #body="slotProps">
            <div class="flex items-center gap-4">
              <img :src="slotProps.data.employee_photo_url" :alt="slotProps.data.employee_name" class="w-[46px] object-fit h-[50px] rounded-[3px]">
              <div>
                <p class="text-white font-semibold">{{ slotProps.data.employee_name }}</p>
                <p class="text-gray-600 text-sm">{{ slotProps.data.employee_company_name }}</p>
                <p class="text-gray-600 text-sm">@{{ slotProps.data.employee_id }}</p>
              </div>
            </div>
            </template>
          </Column>
            <Column header="Department">
            <template #body="slotProps">
              <div class="text-white">{{ slotProps.data.employee_department }}</div>
              <div class="text-gray-600 text-sm">{{ slotProps.data.employee_status }}</div>
            </template>
          \</Column>
            <Column header="Joined">
            <template #body="slotProps">
              <div class="text-white">{{ slotProps.data.employee_join_date }}</div>
              <div class="text-sm text-gray-600">{{ slotProps.data.employee_contract_date }}</div>
            </template></Column>
            <Column header="Badge ID">
            <template #body="slotProps">
              <div class="text-white">Badge #{{ slotProps.data.employee_badge_id }}</div>
              <div class="text-sm text-gray-600">Pin #{{ slotProps.data.employee_badge_pin }}</div>
            </template>
          </Column>
           <Column header="Tenant">
            <template #body="slotProps">
              <div class="text-white text-sm">{{ slotProps.data.tenant_id }}</div>
            </template>
          </Column>
           <Column header="Phone Number">
            <template #body="slotProps">
              <div class="text-white text-sm">{{ slotProps.data.employee_phone_number_main }}</div>
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
