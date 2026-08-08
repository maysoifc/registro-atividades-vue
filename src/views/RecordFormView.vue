<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { z } from 'zod';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppInput from '@/components/forms/AppInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import { useRecordsStore } from '@/stores/records';

const router = useRouter();
const route = useRoute();
const store = useRecordsStore();

const isEditMode = computed(() => route.params.id !== 'new');

const categories = ['Estudo', 'Trabalho', 'Exercício', 'Lazer'];

const form = ref({
  title: '',
  duration: '',
  notes: '',
  category: 'Estudo',
});

// Mensagem de erro para exibir na tela se a validação falhar
const errorMessage = ref('');

// Schema de validação com Zod
const schema = z.object({
  title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres'),
  duration: z.number({ invalid_type_error: 'A duração deve ser um número' }).min(1, 'A duração deve ser positiva'),
});

onMounted(() => {
  if (isEditMode.value) {
    const record = store.getRecord(route.params.id);
    if (record) {
      form.value = {
        title: record.title,
        duration: record.duration,
        notes: record.notes || '',
        category: record.category || 'Estudo',
      };
    } else {
      router.push('/records');
    }
  }
});

function handleSubmit() {
  errorMessage.value = '';

  try {
    // Valida os dados do formulário usando o Zod
    schema.parse(form.value);

    if (isEditMode.value) {
      store.updateRecord(route.params.id, form.value);
    } else {
      store.addRecord(form.value);
    }

    router.push('/records');
  } catch (error) {
    // Se der erro, pega a mensagem do Zod e mostra para o usuário
    if (error instanceof z.ZodError) {
      errorMessage.value = error.errors[0].message;
    } else {
      errorMessage.value = 'Ocorreu um erro de validação.';
    }
  }
}
</script>

<template>
  <div>
    <AppHeader
      :title="isEditMode ? 'Editar Registro' : 'Novo Registro'"
      show-back
      @back="router.back()"
    />

    <div class="page">
      <form @submit.prevent="handleSubmit" class="form">
        <!-- Alerta de Erro de Validação -->
        <div v-if="errorMessage" class="error-banner">
          {{ errorMessage }}
        </div>

        <AppInput
          v-model="form.title"
          label="Título"
          placeholder="Ex: Estudar Vue.js"
          required
        />

        <AppInput
          v-model.number="form.duration"
          label="Duração (minutos)"
          type="number"
          placeholder="Ex: 60"
          required
        />

        <div class="select-group">
          <label class="label">Categoria</label>
          <select v-model="form.category" class="select-field">
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <div class="textarea-group">
          <label class="label">Observações</label>
          <textarea
            v-model="form.notes"
            rows="4"
            class="textarea"
            placeholder="Adicione observações sobre a atividade..."
          ></textarea>
        </div>

        <AppButton type="submit">
          {{ isEditMode ? 'Salvar alterações' : 'Criar registro' }}
        </AppButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form {
  background: white;
  padding: 20px;
  border-radius: 12px;
}

.error-banner {
  background-color: #ffe6e6;
  color: #d9534f;
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #f5c6cb;
}

.select-group,
.textarea-group {
  margin-bottom: 16px;
}

.label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.select-field {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  background-color: white;
  transition: border-color 0.2s;
}

.select-field:focus {
  outline: none;
  border-color: #0b5cff;
}

.textarea {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;
}

.textarea:focus {
  outline: none;
  border-color: #0b5cff;
}
</style>