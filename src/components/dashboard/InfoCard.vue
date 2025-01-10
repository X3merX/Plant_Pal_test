<template>
  <div class="bg-white w-full dark:bg-[#1D1D1D] rounded-2xl shadow-lg p-6 text-center">
    <h3 class="text-lg font-bold dark:text-white text-blue-600">{{ title }}</h3>
    <p class="text-2xl font-semibold dark:text-white mt-2">
      {{ value }} <span class="text-base">{{ unit }}</span>
    </p>
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
.rounded-2xl {
  border-radius: 16px;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
