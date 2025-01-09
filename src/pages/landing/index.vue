<template>
  <DefaultLayout>
    <div class="relative">
      <!-- Navbar -->
      <nav
        class="flex items-center justify-between px-6 py-4 bg-white shadow fixed w-full top-0 z-50"
      >
        <div class="flex items-center gap-3">
          <!-- Logo -->
          <img src="@/assets/images/logo.png" alt="Logo" class="h-8 w-auto" />
          <!-- Product Name -->
          <span class="text-xl font-semibold text-blue-600">PlantPal</span>
        </div>
        <ul class="flex space-x-6">
          <li><a href="#" class="text-gray-600 hover:text-blue-600">Home</a></li>
          <li><a href="#" class="text-gray-600 hover:text-blue-600">About</a></li>
          <li><a href="#" class="text-gray-600 hover:text-blue-600">Program</a></li>
          <li><a href="#" class="text-gray-600 hover:text-blue-600">Contact</a></li>
        </ul>
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </nav>

      <!-- Page Content -->
      <div
        class="pt-24 h-screen flex justify-center items-center bg-cover bg-center"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      >
        <button
          @click="navigateToDashboard"
          class="bg-blue-600 text-white px-20 py-10 rounded shadow hover:bg-blue-700"
        >
          Dashboard
        </button>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { useRouter } from "vue-router";
import DefaultLayout from "@/layouts/default/index.vue";

// Logo import
import backgroundImage from "@/assets/images/landing-bg.jpg";

// Router instance
const router = useRouter();

// Navigate to the dashboard
const navigateToDashboard = () => {
  router.push("/dashboard");
};
</script>

<style scoped>
/* Sticky navbar */
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
  transition: all 0.3s ease;
}
</style>
