<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  title: {
    type: String,
    default: 'Meu App',
  },
  showBack: Boolean,
});

defineEmits(['back']);

const router = useRouter();
const darkMode = ref(false);

onMounted(() => {
  // Verifica se o modo escuro já está ativo ao carregar
  darkMode.value = document.body.classList.contains('dark-mode');
});

function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  
  if (darkMode.value) {
    document.body.classList.add('dark-mode');
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#f0f0f0';
  } else {
    document.body.classList.remove('dark-mode');
    document.body.style.backgroundColor = '#f4f4f6';
    document.body.style.color = '#111';
  }
}
</script>

<template>
  <header class="app-header">
    <button v-if="showBack" @click="$emit('back')" class="btn-back">←</button>
    <h1>{{ title }}</h1>
    
    <!-- Botão para abrir a tela de Gráficos/Estatísticas -->
    <button @click="router.push('/stats')" class="btn-theme" title="Ver Estatísticas">
      📊
    </button>

    <!-- Botão de Dark Mode -->
    <button @click="toggleDarkMode" class="btn-theme" :title="darkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'">
      {{ darkMode ? '☀️' : '🌙' }}
    </button>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: #0b5cff;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.btn-back {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  margin-right: 8px;
}

.btn-theme {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.btn-theme:hover {
  background: rgba(255, 255, 255, 0.1);
}

.app-header h1 {
  font-size: 18px;
  font-weight: 600;
  flex: 1;
}
</style>