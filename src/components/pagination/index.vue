<template>
  <div class="flex justify-between items-center mt-4">
    <button
      :disabled="!pagination.prev_page_url"
      @click="fetchPage(pagination.current_page - 1)"
      class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>

    <div class="flex space-x-2">
      <button
        v-for="(link, index) in pagination.links"
        :key="index"
        class="text-primary"
         v-if="link && link.url"
      >
        <span class="text-primary" v-html="link.label"></span>
      </button>
    </div>

    <button
      :disabled="!pagination.next_page_url"
      @click="fetchPage(pagination.current_page + 1)"
      class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
  },
  methods: {
    fetchPage(page) {
      if (page) {
        this.$emit("fetchPage", page);
      }
    },
  },
};
</script>

<style scoped></style>
