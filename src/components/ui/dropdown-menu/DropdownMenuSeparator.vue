<script setup>
import { computed } from "vue";
import { DropdownMenuSeparator } from "radix-vue";
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
</script>

<template>
  <DropdownMenuSeparator
    v-bind="delegatedProps"
    :class="cn('-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800', props.class)"
  />
</template>
