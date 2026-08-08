import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

// Importações necessárias para registrar os componentes do Chart.js
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Registra os módulos do gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const app = createApp(App)
const pinia = createPinia() 

app.use(pinia)
app.use(router)
app.mount('#app')