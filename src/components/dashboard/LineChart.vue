<template>
    <div>
      <canvas id="line-chart"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  const props = defineProps({
    labels: Array,
    datasets: Array,
  });
  
  onMounted(() => {
    const ctx = document.getElementById('line-chart').getContext('2d');
    new Chart(ctx, {
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
  </script>
  
  <style scoped>
  canvas {
    width: 100%;
    height: 400px;
  }
  </style>
  