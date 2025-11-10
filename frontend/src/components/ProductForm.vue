<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-content">
      <h3>{{ formTitle }}</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Product Name</label>
          <input type="text" v-model="form.name" id="name" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="form.description" id="description" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" v-model.number="form.price" id="price" step="0.01" required min="0" />
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="form.status" id="status" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <div class="form-actions">
          <button type="button" @click="$emit('cancel')" class="btn btn-secondary">Cancel</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  model: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({})
const errorMessage = ref(null)

const formTitle = computed(() => (props.model ? 'Edit Product' : 'Create Product'))

watch(
  () => props.model,
  (newModel) => {
    form.value = newModel ? { ...newModel } : { name: '', description: '', price: 0, status: 'active' }
    errorMessage.value = null
  },
  { immediate: true }
)

const validateForm = () => {
  if (!form.value.name.trim()) {
    errorMessage.value = 'Product name is required.'
    return false
  }
  if (form.value.price <= 0) {
    errorMessage.value = 'Price must be a positive number.'
    return false
  }
  errorMessage.value = null
  return true
}

const submitForm = () => {
  if (validateForm()) {
    const dataToSave = { ...form.value }
    if (!props.model) {
      dataToSave.createdAt = new Date().toISOString()
    }
    emit('save', dataToSave)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  text-align: center;
}
.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}
.btn-primary { background-color: #42b883; color: white; }
.btn-secondary { background-color: #6c757d; color: white; }
</style>
