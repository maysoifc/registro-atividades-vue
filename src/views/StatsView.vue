<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import AppHeader from '@/components/layout/AppHeader.vue';
import { useRecords } from '@/composables/useRecords';

// Registra localmente caso prefira (ou use o registro global no main.js)
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { records } = useRecords();

// Prepara os dados dinâmicos baseados nos seus registros salvos
const chartData = computed(() => ({
  labels: records.value.map((r) => r.title),
  datasets: [
    {
      label: 'Duração (minutos)',
      data: records.value.map((r) => r.duration),
      backgroundColor: '#0b5cff',
      borderRadius: 6,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<template>
  <div>
    <AppHeader title="Estatísticas" show-back @back="$router.push('/')" />

    <div class="page">
      <div class="card chart-container">
        <h2 class="chart-title">Duração por Atividade</h2>
        
        <div v-if="records.length > 0" class="wrapper">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
        
        <div v-else class="empty">
          <p>Nenhum dado cadastrado para exibir no gráfico.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  background: white;
  border-radius: 12px;
  padding: 24px;
}

.chart-title {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.wrapper {
  height: 300px;
  position: relative;
}

.empty {
  text-align: center;
  padding: 40px;
  color: #888;
}
</style>