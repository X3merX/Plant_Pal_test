<template>
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow-md flex flex-col items-center justify-center">
      <h3 class="text-lg font-semibold text-primary dark:text-white">{{ title }}</h3>
      <p class="text-2xl font-bold dark:text-white">{{ value }}</p>
      <p class="text-sm text-gray-500">{{ unit }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    value: [String, Number],
    unit: String,
  });
  </script>
  
  <style scoped>
  /* Add styles as necessary */
  </style>
  