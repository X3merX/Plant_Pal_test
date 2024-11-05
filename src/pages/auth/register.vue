<template>
  <AuthLayout>
    <form @submit.prevent="onSubmit" class="md:w-[50%] p-10 md:p-0">
      <img src="@/assets/images/logo.png" alt="logo" class="w-1/3" />
      <div class="text-2xl text-start mt-5 mb-5 font-semibold text-primary">
        Create an account
      </div>
      <FormInput v-model="formData.name" placeholder="Nama Lengkap" class="w-full mt-5">
        <template #label><span class="text-primary">Name Lengkap</span></template>
        <template #error><span class="text-red-500">{{ errors?.name?.[0] }}</span></template>
      </FormInput>
      <div class="w-full flex gap-5">
        <section class="w-1/2">
          <FormInput v-model="formData.asal_instansi" type="text" placeholder="Asal Sekolah" class="w-full">
            <template #label><span class="text-primary">Asal Sekolah</span></template>
            <template #error><span class="text-red-500">{{ errors?.asal_instansi?.[0] }}</span></template>
          </FormInput>
        </section>
        <section class="w-1/2">
          <FormInput v-model="formData.email" type="text" placeholder="Email" class="w-full">
            <template #label><span class="text-primary">Email</span></template>
            <template #error><span class="text-red-500">{{ errors?.email?.[0] }}</span></template>
          </FormInput>
        </section>
      </div>

      <div class="w-full flex gap-5">
        <section class="w-1/2">
          <FormInput v-model="formData.password" type="text" placeholder="Password" class="w-full">
            <template #label
              ><span class="text-primary">Password</span></template
            >
            <template #error><span class="text-red-500">{{ errors?.password?.[0] }}</span></template>
          </FormInput>
        </section>
        <section class="w-1/2">
          <FormInput
            v-model="formData.password_confirmation"
            type="text"
            placeholder="Konfirmasi Password"
            class="w-full"
          >
            <template #label
              ><span class="text-primary">Konfirmasi Password</span></template
            >
          </FormInput>
        </section>
      </div>
      <div class="mt-5 justify-between gap-4 flex items-center text-primary">
        <div class="flex gap-2">
          <Checkbox id="terms" />
          <label
            for="terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </div>
      <Button type="submit" class="w-full py-3 mt-5">Register</Button>

      <div @click="$router.push('/login')" class="mt-14 cursor-pointer text-primary text-center">
        Already have account? sign in
      </div>
    </form>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/index.vue";
import Button from "@/components/button/index.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "../../stores/authStore";
import { ref } from "vue";
import { useLoading } from "vue-loading-overlay";
import { useNotificationStore } from "../../stores/notification";
import { useRouter } from "vue-router";
const notificationStore = useNotificationStore();

const $loading = useLoading({});
const formData = ref({});
const authStore = useAuthStore();
const router = useRouter();
const errors = ref({});const onSubmit = async () => {
  const loader = $loading.show({});
  try {
    const resp = await authStore.register(formData.value);
    errors.value = {};
    notificationStore.showNotification("Register berhasil, silakan lakukan verifikasi akun", 'success');
    router.push("/login");
  } catch (error) {
    // Handle case where error or error.response.data might be null/undefined
    const errorData = error?.response?.data;
    errors.value = errorData?.data || {};
    console.log(errors.value);
    notificationStore.showNotification(errorData?.message || "An error occurred", 'error');
  } finally {
    loader?.hide?.(); // Ensure loader is not null before calling hide
  }
}

</script>

<style lang="scss" scoped></style>
