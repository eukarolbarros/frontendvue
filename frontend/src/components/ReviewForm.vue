<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-content">
      <h3>{{ formTitle }}</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="author">Your Name</label>
          <input type="text" v-model="form.author" id="author" required />
        </div>
        <div class="form-group">
          <label for="rating">Rating</label>
          <select v-model.number="form.rating" id="rating" required>
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </div>
        <div class="form-group">
          <label for="comment">Comment</label>
          <textarea v-model="form.comment" id="comment" rows="4" required></textarea>
        </div>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <div class="form-actions">
          <button type="button" @click="$emit('cancel')" class="btn btn-secondary">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Review</button>
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
  productId: {
    type: Number,
    required: true,
  }
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({})
const errorMessage = ref(null)

const formTitle = computed(() => (props.model ? 'Edit Review' : 'Add a Review'))

watch(
  () => props.model,
  (newModel) => {
    form.value = newModel ? { ...newModel } : { author: '', rating: 5, comment: '' }
    errorMessage.value = null
  },
  { immediate: true }
)

const validateForm = () => {
  if (!form.value.author.trim()) {
    errorMessage.value = 'Your name is required.'
    return false
  }
  if (!form.value.comment.trim()) {
    errorMessage.value = 'A comment is required.'
    return false
  }
  errorMessage.value = null
  return true
}

const submitForm = () => {
  if (validateForm()) {
    const dataToSave = {
      ...form.value,
      productId: props.productId,
    }
    if (!props.model) {
      dataToSave.date = new Date().toISOString()
    }
    emit('save', dataToSave)
  }
}
</script>

<style scoped>
/* Using same modal styles as ProductForm for consistency */
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
