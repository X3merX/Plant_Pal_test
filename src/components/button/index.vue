<template>
  <button
    :class="[ 
      outline ? outlineVariant : variantType,
      hover 
        ? variantType === dangerVariant 
          ? 'hover:bg-red-900' 
          : variantType === lightVariant 
            ? 'hover:bg-slate-50' 
            : 'hover:bg-[#0C3E7C]' 
        : '' 
    ]"
    class="rounded-lg px-[20px]"
  >
    <slot />
  </button>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  outline: {
    type: Boolean,
    default: false,
  },
  hover: {
    type: Boolean,
    default: true,
  },
  margin: {
    type: String,
    default: "px-[50px]",
  },
  variant: {
    type: String,
    default: "primary", // 'primary', 'danger', 'light'
  },
});

const baseVariant = ref(
  "bg-primary transition-all text-white dark:bg-[#4444] dark:text-white"
);
const dangerVariant = ref(
  "bg-red-500 transition-all text-white dark:bg-red-900 dark:text-white"
);
const lightVariant = ref(
  "bg-gray-200 transition-all text-black dark:bg-dark-secondary dark:text-white"
);
const outlineVariant = ref(
  "border text-primary hover:text-white transition-all border-[#0C3E7C] bg-[#F3F6F8]"
);

// Dynamically assign variant based on props
const variantType = ref(
  props.variant === "danger"
    ? dangerVariant
    : props.variant === "light"
    ? lightVariant
    : baseVariant
);
</script>

<style lang="scss" scoped></style>
