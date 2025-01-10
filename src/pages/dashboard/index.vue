<template>
  <DefaultLayout>
    <!-- Info Cards -->
    <div class="text-xl text-center font-bold dark:text-white">
      Realtime Data
    </div>
    <section class="p-6 flex justify-between gap-4 w-full overflow-auto">
      <InfoCard title="Temperature" :value="temperature" unit="°C" />
      <InfoCard title="Humidity" :value="humidity" unit="%" />
      <InfoCard title="Soil Moisture" :value="soilMoisture" unit="%" />
    </section>
    <div class="text-xl text-center font-bold dark:text-white">
      Data Detail Suhu
    </div>
    <section class="p-6 flex justify-between gap-4 w-full overflow-auto">
      <InfoCard title="Rata-rata" :value="suhu.rata" unit="°C" />
      <InfoCard title="Minimal" :value="suhu.min" unit="°C" />
      <InfoCard title="Maximal" :value="suhu.max" unit="°C" />
    </section>

    <div class="text-xl text-center font-bold dark:text-white">
      Data Detail Kelembapan Udara
    </div>
    <section class="p-6 flex justify-between gap-4 w-full overflow-auto">
      <InfoCard title="Rata-rata" :value="humid.rata" unit="°C" />
      <InfoCard title="Minimal" :value="humid.min" unit="°C" />
      <InfoCard title="Maximal" :value="humid.max" unit="°C" />
    </section>

    <div class="text-xl text-center font-bold dark:text-white">
      Data Detail Kelembapan Tanah
    </div>
    <section class="p-6 flex justify-between gap-4 w-full overflow-auto">
      <InfoCard title="Rata-rata" :value="soil.rata" unit="%" />
      <InfoCard title="Minimal" :value="soil.min" unit="%" />
      <InfoCard title="Maximal" :value="soil.max" unit="%" />
    </section>

    <!-- Soil Data Chart -->
    <section class="mt-6 p-6 bg-white dark:bg-[#1D1D1D] rounded shadow">
      <h2 class="text-xl font-bold dark:text-white">Soil Data</h2>
      <LineChart chartRef="soil" :labels="day" :datasets="soilChart" />
    </section>

    <!-- Humidity Data Chart -->
    <section class="mt-6 p-6 bg-white dark:bg-[#1D1D1D] rounded shadow">
      <h2 class="text-xl font-bold dark:text-white">Kelembaban Data</h2>
      <LineChart
        chartRef="kelembaban"
        :labels="day"
        :datasets="kelembabanChart"
      />
    </section>

    <!-- Temperature Data Chart -->
    <section class="mt-6 p-6 bg-white dark:bg-[#1D1D1D] rounded shadow">
      <h2 class="text-xl font-bold dark:text-white">Suhu Data</h2>
      <LineChart chartRef="suhu" :labels="day" :datasets="suhuChart" />
    </section>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/dashboard/index.vue";
import InfoCard from "@/components/dashboard/InfoCard.vue";
import LineChart from "@/components/dashboard/LineChart.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import mqtt from "mqtt";

// Info Card Data
const temperature = ref(0);
const humidity = ref(0);
const soilMoisture = ref(0);

// Chart Data Initialization
const soilChart = ref([]);
const kelembabanChart = ref([]);
const suhuChart = ref([]);
const day = ref([]);

const brokerUrl = "wss://plantpal-mqtt.zqdevs.my.id"; // Use WebSocket protocol
const topic = "plantpal/data";
let mqttClient = null;

const handleMessage = (payload) => {
  try {
    const data = JSON.parse(payload.toString());
    temperature.value = data.temperature;
    humidity.value = data.humidity;
    soilMoisture.value = data.soil_moisture;
  } catch (error) {
    console.error("Error parsing MQTT message:", error);
  }
};

let suhu = ref({});
let humid = ref({});
let soil = ref({});
const FetchData = async () => {
  try {
    const resp = await axios.get("/api/chart");
    soilChart.value = [
      {
        label: "Soil Moisture",
        data: resp.data.soil.map((item) => item ?? 0),
        borderColor: "#4CAF50",
        fill: false,
      },
    ];
    kelembabanChart.value = [
      {
        label: "Humidity",
        data: resp.data.kelembapan.map((item) => item ?? 0),
        borderColor: "#2196F3",
        fill: false,
      },
    ];
    suhuChart.value = [
      {
        label: "Temperature",
        data: resp.data.suhu.map((item) => item ?? 0),
        borderColor: "#FF9800",
        fill: false,
      },
    ];

    day.value = resp.data.label;

    axios.get("/api/dht/avg").then((resp) => {
      suhu.value.min = resp.data.min_suhu;
      suhu.value.max = resp.data.max_suhu;
      suhu.value.rata = resp.data.rata_suhu;
      humid.value.min = resp.data.min_humid;
      humid.value.max = resp.data.max_humid;
      humid.value.rata = resp.data.rata_humid;
    });

    axios.get("/api/soil/avg").then((resp) => {
      console.log(resp.data);

      soil.value.min = resp.data.min_soil;
      soil.value.max = resp.data.max_soil;
      soil.value.rata = resp.data.avg_soil;
      console.log(soil);
    });
  } catch (error) {
    console.log(resp.data);
  }
};

// Fetch Data for Charts
onMounted(async () => {
  await FetchData();
  mqttClient = mqtt.connect(brokerUrl);

  mqttClient.on("connect", () => {
    console.log("Connected to MQTT broker");
    mqttClient.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Subscribed to topic: ${topic}`);
      } else {
        console.error("Subscription error:", err);
      }
    });
  });

  mqttClient.on("message", (receivedTopic, payload) => {
    handleMessage(payload);
  });

  mqttClient.on("error", (error) => {
    console.error("MQTT Error:", error);
  });
});
</script>

<style scoped>
/* Basic Styling for Consistency */
section {
  margin-bottom: 1.5rem;
}
</style>
