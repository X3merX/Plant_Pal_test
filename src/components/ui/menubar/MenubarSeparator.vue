<script setup>
import { computed } from "vue";
import { MenubarSeparator, useForwardProps } from "radix-vue";
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
  <MenubarSeparator
    :class="
      cn('-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800', props.class)
    "
    v-bind="forwardedProps"
  />
</template>
