<script setup>
import { ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import RecordCard from '@/components/records/RecordCard.vue';
import { useRecords } from '@/composables/useRecords';

const router = useRouter();
const { records } = useRecords();

// Campo de busca reativo
const searchQuery = ref('');

// Ordena por data (mais recente primeiro) e filtra pelo texto digitado na busca
const filteredRecords = computed(() => {
  const sorted = [...records.value].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (!searchQuery.value) return sorted;

  return sorted.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('pt-BR');
}
</script>

<template>
  <div>
    <AppHeader title="Meus Registros" show-back @back="router.push('/')" />

    <div class="page">
      <!-- Input de Busca -->
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar registros..."
          class="search-input"
        />
      </div>

      <div v-if="filteredRecords.length > 0" class="list">
        <RouterLink
          v-for="record in filteredRecords"
          :key="record.id"
          :to="`/records/${record.id}`"
          class="link"
        >
          <RecordCard
            :title="record.title"
            :duration="record.duration"
            :date="formatDate(record.createdAt)"
          />
        </RouterLink>
      </div>

      <div v-else class="empty">
        <p>📭</p>
        <p>Nenhum registro encontrado</p>
        <RouterLink to="/records/new/edit" class="btn">
          Criar primeiro registro
        </RouterLink>
      </div>

      <RouterLink to="/records/new/edit" class="fab"> + </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
  background: white;
}

.search-input:focus {
  border-color: #0b5cff;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link {
  text-decoration: none;
}

.empty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty p:first-child {
  font-size: 48px;
  margin-bottom: 16px;
}

.btn {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background: #0b5cff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}

.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: #0b5cff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  z-index: 10;
}

.fab:active {
  transform: scale(0.9);
}
</style>