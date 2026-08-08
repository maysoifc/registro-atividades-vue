import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useRecordsStore = defineStore('records', () => {
  // Inicializa a lista buscando do localStorage (ou vazia se não houver nada)
  const storedRecords = JSON.parse(localStorage.getItem('my_records')) || [];
  const records = ref(storedRecords);

  // Salva no localStorage sempre que houver alterações
  watch(
    records,
    (newVal) => {
      localStorage.setItem('my_records', JSON.stringify(newVal));
    },
    { deep: true }
  );

  // Adicionar novo registro
  function addRecord(recordData) {
    const newRecord = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...recordData,
    };
    records.value.push(newRecord);
  }

  // Buscar um registro específico pelo ID
  function getRecord(id) {
    return records.value.find((r) => r.id === id);
  }

  // Atualizar um registro existente
  function updateRecord(id, updatedData) {
    const index = records.value.findIndex((r) => r.id === id);
    if (index !== -1) {
      records.value[index] = { ...records.value[index], ...updatedData };
    }
  }

  // Excluir um registro
  function deleteRecord(id) {
    records.value = records.value.filter((r) => r.id !== id);
  }

  return {
    records,
    addRecord,
    getRecord,
    updateRecord,
    deleteRecord,
  };
});