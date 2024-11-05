<template>
  <div class="p-7 bg-secondary md:rounded-3xl w-full">
    <div
      id="scroll"
      ref="scrollContainer"
      class="md:flex snap-center w-full pt-[90px] h-[390px] md:h-full gap-7 overflow-hidden pr-2 md:pr-0 snap-mandatory snap-both"
    >
        <slot />
    </div>
    <div class="flex w-full justify-center space-x-2 mt-5">
      <button
        class="p-2 bg-gray-200 w-8 h-8 items-center justify-center md:flex hidden hover:bg-gray-300 rounded-full transition duration-300"
        @click="scrollX(-1)"
      >
        &lt;
      </button>
      <button
        class="p-2 bg-gray-200 w-8 h-8 items-center justify-center md:flex hidden hover:bg-gray-300 rounded-full transition duration-300"
        @click="scrollX(1)"
      >
        &gt;
      </button>

      <button
        class="p-2 bg-gray-200 w-8 h-8 items-center justify-center md:hidden my-2 hover:bg-gray-300 rounded-full transition duration-300"
        @click="scrollY(-1)"
      >
        &uarr;
      </button>
      <button
        class="p-2 bg-gray-200 w-8 h-8 items-center justify-center md:hidden my-2 hover:bg-gray-300 rounded-full transition duration-300"
        @click="scrollY(1)"
      >
        &darr;
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const scrollContainer = ref(null);

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
const scrollX = (direction) => {
  const scrollAmount = 300; // Adjust the scroll distance as needed
  const container = scrollContainer.value;
  const currentScroll = container.scrollLeft;
  console.log(currentScroll);
  const targetScroll = currentScroll + scrollAmount * direction;
  container.scrollTo({
    left: targetScroll,
    behavior: "smooth",
  });
};

const scrollY = (direction) => {
  const scrollAmount = 390; // Adjust the scroll distance as needed
  const container = scrollContainer.value;
  const currentScroll = container.scrollTop;
  const targetScroll = currentScroll + scrollAmount * direction;
  container.scrollTo({
    top: targetScroll,
    behavior: "smooth",
  });
};
</script>

<style lang="scss" scoped></style>
