<template>
  <div class="flex justify-center h-screen items-center">
    <div class="bg-[#1F2937] p-6 rounded lg:w-[26rem]">

      <div class="text-center my-2">
        <img :src="logo" class="h-[110px] mx-auto" />
        <h2 class="text-2xl text-gray-400 mt-3">Welcome</h2>
      </div>

      <div class="flex flex-col">
        <div class="flex-col flex mb-2">
          <label class="text-gray-400 pl-[26px]">Email Address</label>
          <InputText class="!text-white" v-model="email" />
        </div>

        <div class="flex-col flex mb-5">
          <label class="text-gray-400 pl-[26px]">Password</label>
          <Password :feedback="false" showClear v-model="password" />
        </div>

        <Button
          type="submit"
          class="!bg-[#60A5FA] !border-none text-info flex px-4 py-3 rounded w-[320px] mx-auto gap-4 items-center justify-center font-bold"
          @click="handleLogin">
          <span v-if="!loading" class="pi pi-user"></span>
          <span v-if="loading">Loading...</span>
          Login
        </Button>

        <p v-if="error" class="text-red-400 text-center mt-3">{{ error }}</p>
      </div>

      <p class="text-gray-500 my-3 text-center text-[13px] w-[320px] mx-auto">
        If you forgot your password, please contact the admin.
      </p>

      <div class="text-center flex items-center justify-center">
        <span class="I">I</span>
        <span class="M">M</span>
        <span class="A">A</span>
        <span class="B">B</span>
      </div>

      <p class="text-sm text-gray-400 text-center mt-3" style="letter-spacing: 1rem;">core</p>

      <div class="flex justify-center items-center">
        <span class="text-sm text-gray-200 bg-gray-600 rounded-full mt-3 px-4 py-[2.5px] mb-5">
          production
        </span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import logo from "@/assets/images/logo.png";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref("");
const password = ref("");
const { login, loading, error } = useAuth();

const handleLogin = async () => {
  if (email.value === "" || password.value === "") {
    error.value = "Please fill in all fields";
    return;
  }

  const result = await login(email.value, password.value);

  if (result) {
    router.push('/attendance')
  }
};
</script>
