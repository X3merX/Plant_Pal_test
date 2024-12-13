<template>
    <section class="flex h-screen">
      <!-- Sidebar -->
      <aside class="w-1/4 bg-gray-100 dark:bg-gray-800 p-4">
        <sidebarMenu />
      </aside>
  
      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </section>
  </template>
  
  <script setup>
  import sidebarMenu from "@/components/layouts/dashboard/sidebar/menu/index.vue";
  </script>
  
  <style scoped>
  aside {
    min-width: 250px;
  }
  </style>
  