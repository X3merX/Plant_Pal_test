<script setup>
import { computed } from "vue";
import { StepperSeparator, useForwardProps } from "radix-vue";

import { cn } from "@/components/lib/utils";

const props = defineProps({
  orientation: { type: String, required: false },
  decorative: { type: Boolean, required: false },
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
  <StepperSeparator
    v-bind="forwarded"
    :class="
      cn(
        'bg-neutral-100 dark:bg-primary',
        // Disabled
        'group-data-[disabled]:bg-neutral-100 group-data-[disabled]:opacity-50 dark:group-data-[disabled]:bg-primary',
        // Completed
        'group-data-[state=completed]:bg-neutral-900 dark:group-data-[state=completed]:bg-neutral-50',
        props.class,
      )
    "
  />
</template>
