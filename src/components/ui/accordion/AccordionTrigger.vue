<script setup>
import { computed } from "vue";
import { AccordionHeader, AccordionTrigger } from "radix-vue";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "@/components/lib/utils";

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  custom: { type: null, required: false }, // Rename 'class' to 'custom'
});

const delegatedProps = computed(() => {
  const { custom: _, ...delegated } = props; // Update this too
  return delegated;
});
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="
        cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          props.custom // Updated reference to 'custom'
        )
      "
    >
      <slot />
      <slot name="icon">
        <ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
