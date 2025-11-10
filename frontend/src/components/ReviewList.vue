<template>
  <div class="review-section">
    <h4>Reviews</h4>
    <div v-if="isLoading" class="loading">Loading reviews...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <div v-if="!isLoading && !error">
      <p v-if="reviews.length === 0">No reviews yet.</p>
      <ul v-else class="review-list">
        <li v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-header">
            <strong>{{ review.author }}</strong>
            <span> - {{ review.rating }} / 5 stars</span>
          </div>
          <p class="review-comment">{{ review.comment }}</p>
          <small class="review-date">{{ formatDate(review.date) }}</small>
          <div class="review-actions">
            <button @click="$emit('open-review-form', review)" class="btn-link">Edit</button>
            <button @click="confirmDelete(review.id)" class="btn-link btn-link-danger">Delete</button>
          </div>
        </li>
      </ul>
    </div>
    <button @click="$emit('open-review-form', null)" class="btn btn-secondary btn-sm">Add Review</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import reviewService from '@/services/reviewService'

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
})

defineEmits(['open-review-form'])

const reviews = ref([])
const isLoading = ref(false)
const error = ref(null)

const fetchReviews = async () => {
  if (!props.productId) return
  isLoading.value = true
  error.value = null
  try {
    const response = await reviewService.getReviewsForProduct(props.productId)
    reviews.value = response.data
  } catch (_) {
    error.value = 'Failed to fetch reviews.'
  } finally {
    isLoading.value = false
  }
}

const confirmDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this review?')) {
    deleteReview(id)
  }
}

const deleteReview = async (id) => {
  try {
    await reviewService.deleteReview(id)
    fetchReviews()
  } catch (_) {
    error.value = 'Failed to delete review.'
  }
}

const formatDate = (value) => {
  return new Date(value).toLocaleDateString()
}

watch(() => props.productId, fetchReviews, { immediate: true })

defineExpose({ fetchReviews })
</script>

<style scoped>
.review-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}
.review-list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}
.review-item {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}
.review-header {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}
.review-comment {
  margin: 0.5rem 0;
}
.review-date {
  font-size: 0.8rem;
  color: #6c757d;
}
.review-actions {
  margin-top: 0.5rem;
}
.btn-link {
  background: none;
  border: none;
  color: #42b883;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  margin-right: 1rem;
}
.btn-link-danger {
  color: #dc3545;
}
.btn-sm {
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
}
.btn-secondary { background-color: #6c757d; color: white; }
.loading, .error-message {
  font-size: 0.9rem;
  color: #6c757d;
}
.error-message { color: #dc3545; }
</style>
