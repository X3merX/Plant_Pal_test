<template>
  <div>
    <canvas :id="canvasId" ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  labels: Array,
  datasets: Array,
});

// Generate a unique ID for the canvas element
const canvasId = `chart-${Math.random().toString(36).substr(2, 9)}`;

// Define a ref for the canvas element
const chartCanvas = ref(null);

let chartInstance = null;

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: props.datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
});

watch(
  () => [props.labels, props.datasets],
  () => {
    if (chartInstance) {
      chartInstance.data.labels = props.labels;
      chartInstance.data.datasets = props.datasets;
      chartInstance.update();
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
canvas {
  width: 100%;
  height: 400px;
}
</style>
