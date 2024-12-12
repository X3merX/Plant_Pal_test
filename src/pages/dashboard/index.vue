<template>
    <DefaultLayout>
      <section class="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <InfoCard title="Temperature" :value="temperature" unit="°C" />
        <InfoCard title="Humidity" :value="humidity" unit="%" />
        <InfoCard title="Soil Moisture" :value="soilMoisture" unit="%" />
      </section>
  
      <section class="mt-6 p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 class="text-xl font-bold dark:text-white">Realtime Data</h2>
        <LineChart :labels="labels" :datasets="datasets" />
      </section>
    </DefaultLayout>
  </template>
  
  <script setup>
  import DefaultLayout from "@/layouts/dashboard/index.vue";
  import InfoCard from "@/components/dashboard/InfoCard.vue";
  import LineChart from "@/components/dashboard/LineChart.vue";
  import { ref, onMounted } from "vue";
  
  // Mock Data
  const temperature = ref(25);
  const humidity = ref(60);
  const soilMoisture = ref(40);
  
  const labels = ref(["1s", "2s", "3s", "4s", "5s"]);
  const datasets = ref([
    {
      label: "Temperature (°C)",
      data: [22, 24, 23, 25, 26],
      borderColor: "#FF6384",
      fill: false,
    },
    {
      label: "Humidity (%)",
      data: [55, 60, 58, 62, 61],
      borderColor: "#36A2EB",
      fill: false,
    },
    {
      label: "Soil Moisture (%)",
      data: [35, 40, 38, 42, 39],
      borderColor: "#FFCE56",
      fill: false,
    },
  ]);
  
  // Simulate realtime updates
  onMounted(() => {
    setInterval(() => {
      temperature.value = Math.random() * 10 + 20;
      humidity.value = Math.random() * 20 + 50;
      soilMoisture.value = Math.random() * 20 + 30;
  
      labels.value.push(`${labels.value.length + 1}s`);
      if (labels.value.length > 10) labels.value.shift();
  
      datasets.value[0].data.push(temperature.value);
      datasets.value[1].data.push(humidity.value);
      datasets.value[2].data.push(soilMoisture.value);
  
      datasets.value.forEach((dataset) => {
        if (dataset.data.length > 10) dataset.data.shift();
      });
    }, 1000);
  });
  </script>
  