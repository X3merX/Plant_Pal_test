<script setup>
import { computed } from "vue";
import { StepperIndicator, useForwardProps } from "radix-vue";

import { cn } from "@/components/lib/utils";

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <StepperIndicator
    v-bind="forwarded"
    :class="
      cn(
        'inline-flex items-center justify-center rounded-full text-neutral-500/50 w-10 h-10 dark:text-neutral-400/50',
        // Disabled
        'group-data-[disabled]:text-neutral-500 group-data-[disabled]:opacity-50 dark:group-data-[disabled]:text-neutral-400',
        // Active
        'group-data-[state=active]:bg-primary group-data-[state=active]:text-neutral-50 dark:group-data-[state=active]:bg-neutral-50 dark:group-data-[state=active]:text-primary',
        // Completed
        'group-data-[state=completed]:bg-neutral-100 group-data-[state=completed]:text-primary dark:group-data-[state=completed]:bg-primary dark:group-data-[state=completed]:text-neutral-50',
        props.class,
      )
    "
  >
    <slot />
  </StepperIndicator>
</template>
