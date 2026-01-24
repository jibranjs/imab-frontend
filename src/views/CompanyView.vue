<template>
  <!-- Top Bar -->
  <div class="flex justify-end items-center px-6">
     <Button label="Refresh" @click="fetchCompany()"
      class="!m-5 !border-none !bg-gray-600 hover:!bg-white hover:!text-gray-600" />
     <Button label="Add Company" @click="showAddCompanyDialog = true"
      class="!border-none !bg-gray-600 hover:!bg-white !mr-3 hover:!text-gray-600" />
  </div>

<!-- Main Data table -->
        <DataTable :value="company" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="company_name" header="Name"></Column>
            <Column field="company_email" header="Email" />
            <Column field="company_joined" header="Joined Date" />
            <Column field="company_address" header="Address" />
            <Column field="id" header="Actions">
              <template #body="slotProps">
                <Button icon="pi pi-pencil" @click="showUpdate(slotProps.data)" class="!bg-[#4a5565]  !border-none hover:!bg-gray-300 hover:!text-[#111827] !mr-2" />
                <Button icon="pi pi-trash" @click="ShowDelete(slotProps.data)" class="!bg-[#4a5565] !border-none hover:!bg-gray-300 text-white hover:!text-[#111827]" />
              </template>
              </Column>
        </DataTable>

<!-- Create Company Dialog -->
<Dialog v-model:visible="showAddCompanyDialog" @hide="resetform()" modal header="Create Company" :style="{ width: '800px' }">
  <div class="text-white space-y-2 mb-6">
    <div class="grid grid-cols-2 justify-center gap-6">
      <div class="mb-4">
        <h2 class="text-lg font-bold ">Company Details</h2>
        <hr class="mb-3 mt-2 border-[#6B7280]">
          <div>
            <label>Company Name</label>
            <InputText v-model="form.company_name" class="!w-full !mb-3" placeholder="Enter company name" />
          </div>
          <div>
            <label>Company Email</label>
            <InputText v-model="form.company_email" class="!w-full !mb-3" placeholder="Enter company email" />
          </div>
      </div>

      <!-- Col 2 -->
      <div class="mb-4">
        <h2 class="text-lg font-bold">Additional Info</h2>
        <hr class="mb-3 mt-2 border-[#6B7280]">
         <div>
            <label>Company Address</label>
            <InputText v-model="form.company_address" class="!w-full !mb-3" placeholder="Enter company address" />
          </div>
        <div>
          <label>Joined Date</label>
          <InputText v-model="form.company_joined" type="date" class="!w-full !mb-3"/>
        </div>

      </div>

    </div>

    <!-- Create Error -->
    <div v-if="createError" class="bg-red-800 w-full mx-auto text-white p-2 rounded-md">
      <p class="text-center">{{ createError }}</p>
    </div>
  </div>

  <div class="flex gap-2 justify-between mt-4">
    <Button label="Cancel"
      @click="$emit('close-dialog')" :disabled="$props.loading"
      class="!bg-gray-600 !border-none !text-white"
    />
    <Button label="Save"
      :loading="createLoading"
      @click="addCompany"
      class="
        !bg-white !text-[#0A0E17] !border-none
      "
    />
  </div>
</Dialog>

<!-- Delete Dialog -->
<Dialog v-model:visible="showDeleteDialog" modal header="Delete Company" :style="{ width: '450px' }">
  <div class="text-white">
    <p class="text-gray-300 ">Are you sure you want to delete this company?</p>
    <div v-if="deleteError" class="bg-red-800 w-full mx-auto text-white p-2 rounded-md mt-4">
      <p class="text-center">{{ deleteError }}</p>
  </div>
  </div>
  <div class="flex gap-4 justify-end mt-4">
    <Button label="Cancel"
      @click="showDeleteDialog = false"
      class="!bg-gray-800 hover:!bg-gray-600 !border-none !text-white"
    />
    <Button :loading="deleteLoading" label="Delete"
      @click="deleteCompanyForm()"
      class="
        !bg-red-600 !border-none !text-white
      "
    />
  </div>
</Dialog>

<!-- Update Dialog -->
 <Dialog v-model:visible="showUpdateDialog" @hide="resetform" modal header="Update Company" :style="{ width: '800px' }">
  <div class="text-white space-y-2 mb-6">
    <div class="grid grid-cols-2 justify-center gap-6">
      <div class="mb-4">
        <h2 class="text-lg font-bold ">Company Details</h2>
        <hr class="mb-3 mt-2 border-[#6B7280]">
          <div>
            <label>Company Name</label>
            <InputText v-model="form.company_name" class="!w-full !mb-3" placeholder="Enter company name" />
          </div>
          <div>
            <label>Company Email</label>
            <InputText v-model="form.company_email" class="!w-full !mb-3" placeholder="Enter company email" />
          </div>
      </div>

      <!-- Col 2 -->
      <div class="mb-4">
        <h2 class="text-lg font-bold">Info</h2>
        <hr class="mb-3 mt-2 border-[#6B7280]">
         <div>
            <label>Company Address</label>
            <InputText v-model="form.company_address" class="!w-full !mb-3" placeholder="Enter company address" />
          </div>
        <div>
          <label>Joined Date</label>
          <InputText v-model="form.company_joined" type="date" class="!w-full !mb-3"/>
        </div>
      </div>
    </div>
    <!-- Error -->
     <div v-if="updateError" class="bg-red-800 w-full mx-auto text-white p-2 rounded-md">
      <p class="text-center">{{ updateError }}</p>
     </div>
         <div class="flex gap-2 justify-between mt-4">
      <Button label="Close" @click="showUpdateDialog = false" class="!bg-gray-600 !border-none !text-white" />
      <Button label="Update" :loading="updateLoading" @click="updateCompanyForm()"
        class="!bg-gray-600 !border-none !text-white" />
    </div>
    </div>
 </Dialog>

<!-- Loading and Error Messages -->
<div class="justify-center flex items-center h-[40vh]">
  <p v-if="loading" class="text-gray-400 font-bold text-center text-lg my-2">Loading...</p>
</div>
</template>

<script setup>
  // Import Vue and needed components
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import { useCompany } from '@/composables/Company/useCompany.js';
import { useCreateCompany } from '@/composables/Company/useCreateCompany';
import { useDeleteCompany } from '@/composables/Company/useDeleteCompany';
import { useUpdateCompany } from '@/composables/Company/useUpdateCompany';
import { onMounted , ref} from 'vue';
import InputText from 'primevue/inputtext';


//Composables usage
const { company , fetchCompany , loading } = useCompany();
const { createCompany , loading: createLoading , error: createError } = useCreateCompany();
const { deleteCompany , loading: deleteLoading , error: deleteError } = useDeleteCompany();
const { updateCompany , loading: updateLoading , error: updateError } = useUpdateCompany();

// Variables
const showAddCompanyDialog = ref(false);
const showDeleteDialog = ref(false);
const showUpdateDialog = ref(false);
const form = ref({
  company_name : '',
  company_email : '',
  company_address : '',
  company_joined : '',
});

// Reset Form Function
const resetform = () => {
  form.value.company_name = '';
  form.value.company_email = '';
  form.value.company_address = '';
  form.value.company_joined = '';
  // Errors
  createError.value = "";
  deleteError.value = "";
  updateError.value = "";


};

// Add Company Function
const addCompany = async () => {
  const companyData = {
    company_name : form.value.company_name,
    company_email : form.value.company_email,
    company_address : form.value.company_address,
    company_joined : form.value.company_joined,
  }
  const response =await createCompany(companyData);
if(response && response.success){
  showAddCompanyDialog.value = false;
  resetform();
  fetchCompany();
} else {
  createError.value = response.message || "Failed to create company. Please try again.";
}
};

// Delete Company Function
const ShowDelete = (data) => {
  form.value.id = data.id;
  showDeleteDialog.value = true;
}

const deleteCompanyForm = async () => {
  const id = form.value.id;
  const response = await deleteCompany(id);

  if (response && response.success) {
      showDeleteDialog.value = false;
      fetchCompany();
  } else {
      deleteError.value = response.message || "Failed to delete company. Please try again.";
    }
};

// Update Company Function
const showUpdate = (data) => {
  if(!form.value) return;
  form.value.id = data.id || "";
  form.value.company_name = data.company_name || "";
  form.value.company_email = data.company_email || "";
  form.value.company_address = data.company_address || "";
  form.value.company_joined = data.company_joined || "";
  showUpdateDialog.value = true;
};
const updateCompanyForm = async () => {
  const companyData = {
    id: form.value.id,
    company_name : form.value.company_name,
    company_email : form.value.company_email,
    company_address : form.value.company_address,
    company_joined : form.value.company_joined
  };
  const response =  await updateCompany(companyData);
  if (response && response.success){
    showUpdateDialog.value = false;
    resetform();
    fetchCompany();
  } else {
    updateError.value = response.message || "Failed to Update Company.";
  }
}
// Fetch companies Onmount
onMounted( async () => {
    fetchCompany();
});

</script>
