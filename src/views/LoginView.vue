<template>
<div class="flex justify-center items-center h-[100vh] bg-[#121212]">
  <div class="bg-[#1F2937] py-10 px-10 rounded ">
    <img src="@/assets/images/logo.png" alt="Logo" class="w-[6rem] mx-auto mb-4">
    <h1 class="text-2xl text-gray-500 text-center mb-4">Welcome</h1>
    <form action="submit">
      <div class="flex flex-col gap-3">
        <div>
          <label class="text-white mb-2 block">Username</label>
          <InputText class="!w-full !py-2" v-model="username" placeholder="Enter your username" />
        </div>
        <div>
          <label class="text-white mb-2 block">Password</label>
          <InputText type="password" class="!w-full !py-2" v-model="password" placeholder="Enter your password" />
        </div>
        <div v-if="error" class="bg-red-300 text-red-500">
          <p class="text-red-400 text-center">{{ error }}</p>
        </div>
        <Button label="Login" :loading="loading" @click="handleLogin" class="!w-full mt-4 !bg-[#60A5FA] !text-gray-600 !font-bold !border-none hover:!bg-[#93C5FD]" />
      </div>
    </form>
  </div>
</div>
</template>
<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

const { loading, error, login } = useAuth();

const username = ref('');
const password = ref('');
const handleLogin = async () => {
  await login(username.value, password.value);
};
</script>
