<template>
  <div class="flex gap-5">
    <Avatar class="w-[53px] h-[53px]">
      <AvatarImage :src="authStore.user.image ? getBackendFullURL(authStore.user.image) : ProfileDefault" />
      <AvatarFallback>Profile</AvatarFallback>
    </Avatar>
    <section class="flex-col justify-center flex">
      <h3 class="text-[15px] dark:text-white text-[#0C3E6C] font-normal">Kelompok A-01</h3>
    </section>
  </div>
</template>

<script setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();
import ProfileDefault from "@/assets/images/profileDefault.png";


const getBackendFullURL = (img) => {
  return import.meta.env.VITE_BASE_URL + 'storage/'+img;
};

</script>

<style scoped></style>
