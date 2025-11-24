<script setup>
import Badge from 'primevue/badge';
import AutoComplete from 'primevue/autocomplete';

const liveDate = ref(new Date().toDateString());

import { ref, onMounted, onUnmounted } from 'vue';

const time = ref(1);
let intervalId = 0;

onMounted(() => {
  intervalId = setInterval(() => {
    time.value = time.value >= 59 ? 1 : time.value + 1;
  }, 1000);
});

onUnmounted(() => clearInterval(intervalId));
</script>
<template>
  <div class="flex justify-between items-center gap-2 px-4 m-3 bg-[#1F2937] rounded-lg py-3">
    <div>
      <h2 class="text-white text-4xl  mb-2">Today</h2>
      <p class="text-white text-sm">{{ liveDate }}</p>
    </div>
    <div class="flex items-center gap-2 ">
      <span class="text-white bg-gray-600 px-3 rounded-full">{{ time }}</span>
            <p class="text-white px-3"> <Badge value="0" severity="secondary"></Badge>MNGR</p>
            <p class="text-white px-3"> <Badge value="0" severity="secondary"></Badge>IT</p>
            <p class="text-white px-3"> <Badge value="0" severity="secondary"></Badge>COVER</p>
            <p class="text-white px-3"> <Badge value="0" severity="secondary"></Badge>MAINT</p>
            <p class="text-white px-3"> <Badge value="0" severity="secondary"></Badge>KEEP</p>
            <p class="text-white px-3"> <Badge value="0" severity="secondary"></Badge>GAURD</p>
            <p class="text-white px-3"> <Badge value="0" severity="success"></Badge>ONLINE</p>
            <p class="text-white px-3"> <Badge value="0" severity="secondary"></Badge>WORKED</p>
            <AutoComplete placeholder="Quick Search" />
            <Button class="bg-gray-600 py-3 px-4 text-[#000] rounded-lg"><span class="pi pi-refresh"></span></Button>
</div>
  </div>
</template>
