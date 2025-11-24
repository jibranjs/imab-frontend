<script setup>
import AutoComplete from 'primevue/autocomplete';
import MultiSelect from 'primevue/multiselect';
</script>
<template>
  <div class="flex items-center py-4 justify-between px-4">
    <div>
      <h2 class="text-white font-bold text-3xl ">Employees</h2>
      <p class="text-white/85 text-sm">Showing 153 results.</p>
    </div>
    <div>
      <div class="flex gap-4">
        <AutoComplete placeholder="Search Employee Name" />
        <MultiSelect  placeholder="All Companies" :maxSelectedLabels="3" />
         <MultiSelect  placeholder="Active" :maxSelectedLabels="3" />
          <MultiSelect  placeholder="All" :maxSelectedLabels="3" />
          <Button class="bg-gray-500 px-4 !py-2 rounded hover:bg-white"><span class="pi pi-check"></span> Add Employee</Button>
          <Button><span class="pi pi-refresh"></span></Button>
      </div>
    </div>
  </div>
</template>
