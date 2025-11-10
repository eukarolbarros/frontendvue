<template>
  <div :class="['notification', type]" v-if="visible">
    <p>{{ message }}</p>
    <button @click="$emit('close')" class="close-btn">&times;</button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'success', // success, error
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 2000;
  min-width: 250px;
}
.notification.success {
  background-color: #42b883;
}
.notification.error {
  background-color: #dc3545;
}
.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  margin-left: 1rem;
}
</style>
