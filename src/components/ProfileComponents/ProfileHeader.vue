<script setup>
import AutoComplete from 'primevue/autocomplete';
import MultiSelect from 'primevue/multiselect'
</script>
<template>
  <div class="flex justify-between items-center px-4 py-6">
    <div>
      <h2 class="text-gray-400 text-2xl">Profiles</h2>
      <p class="text-sm text-gray-600">Showing 160 Results</p>
    </div>
    <div class="flex gap-4">
      <AutoComplete placeholder="Search Employee Name" />
      <MultiSelect :maxSelectedLabels="3" placeholder="All Companies" />
    </div>

  </div>
</template>
