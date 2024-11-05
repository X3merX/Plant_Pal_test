<template>
  <AuthLayout>
    <section class="md:w-[50%] p-10 md:p-0">
      <img src="@/assets/images/logo.png" alt="logo" class="w-1/3" />
      <div class="text-2xl text-start mt-5 mb-5 font-semibold text-primary">
        Login To Your Account
      </div>
      <form @submit.prevent="onSubmit">
        <FormInput
          v-model="formData.email"
          :marginBottom="true"
          placeholder="email"
          class="w-full mt-5"
        >
          <template #label><span class="text-primary">email</span></template>
          <template #error><span class="text-red-500">{{ errors?.email?.[0] }}</span></template>
        </FormInput>
        <FormInput
          v-model="formData.password"
          :marginBottom="true"
          type="password"
          placeholder="Passwowrd"
          class="w-full mt-5"
        >
          <template #label
            ><span class="text-primary">Passwowrd</span></template
          >
          <template #error><span class="text-red-500">{{ errors?.password?.[0] }}</span></template>
        </FormInput>
        <div class="justify-between gap-4 flex items-center text-primary">
          <div class="flex gap-2">
            <Checkbox id="terms" />
            <label
              for="terms"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember Me
            </label>
          </div>
          <span @click="$router.push('/forgot-password')" class="cursor-pointer text-primary text-sm font-medium">Forget Password?</span>
        </div>
        <Button type="submit" class="w-full py-3 mt-5">Login</Button>
      </form>

      <div
        @click="$router.push('/register')"
        class="mt-14 cursor-pointer text-primary text-center"
      >
        Don't have an account? Create account here
      </div>
    </section>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/index.vue";
import Button from "@/components/button/index.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "vue-router";
import { ref } from "vue";

import { useLoading } from "vue-loading-overlay";
import { useAuthStore } from "../../stores/authStore";
import { useNotificationStore } from "../../stores/notification";
const notificationStore = useNotificationStore();
const $loading = useLoading({});
const authStore = useAuthStore();
const router = useRouter();

const errors = ref({});
const formData = ref({});
const onSubmit = async () => {
  const loader = $loading.show({});
  try {
    const resp = await authStore.login(formData.value);
    notificationStore.showNotification(resp?.data?.message, "success");
    const role = authStore.user.role?.position.toLowerCase();
    if (role === "admin" || role === "mentor") {
      router.push("/admin/learning_camp");
    }else{
      router.push("/peserta/profile");
    }
  } catch (error) {
    // Handle case where error or error.response.data might be null/undefined
    const errorData = error?.response?.data;
    errors.value = errorData?.data || {};
    notificationStore.showNotification(errorData?.message || "An error occurred", "error");
  } finally {
    loader?.hide?.(); // Ensure loader is not null before calling hide
  }
};
</script>

<style lang="scss" scoped></style>
