<script setup>
import { computed } from "vue";
import { DialogDescription, useForwardProps } from "radix-vue";
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

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DialogDescription
    v-bind="forwardedProps"
    :class="cn('text-sm text-neutral-500 dark:text-neutral-400', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
