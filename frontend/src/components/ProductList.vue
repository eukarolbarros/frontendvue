<template>
  <div class="product-list-container">
    <!-- Product Toolbar -->
    <div class="toolbar">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search by name..."
        @input="onSearchInput"
        class="search-input"
      />
      <button @click="openForm(null)" class="btn btn-primary">Add Product</button>
    </div>

    <!-- Loading/Error/Empty States -->
    <div v-if="isLoading" class="loading">Loading products...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <p v-else-if="products.length === 0" class="empty-list-message">No products found.</p>

    <!-- Products Table -->
    <table v-else class="products-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-for="product in products" :key="product.id">
        <!-- Product Row -->
        <tr>
          <td>{{ product.name }}</td>
          <td>{{ formatCurrency(product.price) }}</td>
          <td><span :class="['status', product.status]">{{ product.status }}</span></td>
          <td class="actions">
            <button @click="toggleReviews(product.id)" class="btn btn-info btn-sm">
              {{ expandedProductId === product.id ? 'Hide' : 'Show' }} Reviews
            </button>
            <button @click="openForm(product)" class="btn btn-secondary btn-sm">Edit</button>
            <button @click="confirmDelete(product.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
        <!-- Reviews Row (collapsible) -->
        <tr v-if="expandedProductId === product.id">
          <td colspan="4" class="reviews-container">
            <ReviewList
              :product-id="product.id"
              @open-review-form="openReviewForm(product.id, $event)"
              :ref="el => reviewListRefs[product.id] = el"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Review Form Modal -->
    <ReviewForm
      v-if="isReviewFormVisible"
      :model="editingReview"
      :product-id="currentProductIdForReview"
      @cancel="closeReviewForm"
      @save="handleReviewSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import productService from '@/services/productService'
import reviewService from '@/services/reviewService'
import ReviewList from './ReviewList.vue'
import ReviewForm from './ReviewForm.vue'

const emit = defineEmits(['open-form', 'notify'])
defineExpose({ fetchProducts })

// Product state
const products = ref([])
const isLoading = ref(false)
const error = ref(null)
const searchTerm = ref('')

// Review state
const expandedProductId = ref(null)
const isReviewFormVisible = ref(false)
const editingReview = ref(null)
const currentProductIdForReview = ref(null)
const reviewListRefs = ref({})

// --- Search Debounce ---
let debounceTimer = null
const onSearchInput = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    fetchProducts()
  }, 300) // 300ms delay
}
// -----------------------

// Product Methods
async function fetchProducts() {
  isLoading.value = true
  error.value = null
  try {
    // If searchTerm is empty, name_like will be undefined and not sent in params
    const params = { name_like: searchTerm.value || undefined }
    const response = await productService.getProducts(params)
    products.value = response.data
  } catch (_) {
    error.value = 'Failed to fetch products.'
    emit('notify', error.value, 'error')
  } finally {
    isLoading.value = false
  }
}

const confirmDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this product?')) {
    deleteProduct(id)
  }
}

const deleteProduct = async (id) => {
  try {
    await productService.deleteProduct(id)
    fetchProducts()
    emit('notify', 'Product deleted successfully.', 'success')
  } catch (_) {
    emit('notify', 'Failed to delete product.', 'error')
  }
}

const openForm = (product) => {
  emit('open-form', product)
}

// Review Methods
const toggleReviews = (productId) => {
  expandedProductId.value = expandedProductId.value === productId ? null : productId
}

const openReviewForm = (productId, review) => {
  currentProductIdForReview.value = productId
  editingReview.value = review
  isReviewFormVisible.value = true
}

const closeReviewForm = () => {
  isReviewFormVisible.value = false
  editingReview.value = null
  currentProductIdForReview.value = null
}

const handleReviewSave = async (reviewData) => {
  try {
    if (reviewData.id) {
      await reviewService.updateReview(reviewData.id, reviewData)
      emit('notify', 'Review updated successfully.', 'success')
    } else {
      await reviewService.createReview(reviewData)
      emit('notify', 'Review added successfully.', 'success')
    }
    // Refresh the specific review list
    reviewListRefs.value[reviewData.productId]?.fetchReviews()
    closeReviewForm()
  } catch (_) {
    emit('notify', 'Failed to save review.', 'error')
  }
}

// Helpers
const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

onMounted(fetchProducts)
</script>

<style scoped>
.toolbar { display: flex; justify-content: space-between; margin-bottom: 1rem; }
.search-input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; width: 300px; }
.products-table { width: 100%; border-collapse: collapse; background-color: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.products-table th, .products-table td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #eee; }
.products-table th { background-color: #f8f9fa; font-weight: 600; }
.products-table tbody:last-of-type tr:last-child td { border-bottom: none; }
.actions { display: flex; gap: 0.5rem; }
.btn { padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; }
.btn-sm { padding: 0.3rem 0.6rem; font-size: 0.8rem; }
.btn-primary { background-color: #42b883; color: white; }
.btn-secondary { background-color: #6c757d; color: white; }
.btn-danger { background-color: #dc3545; color: white; }
.btn-info { background-color: #17a2b8; color: white; }
.status { padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem; font-weight: 600; text-transform: capitalize; }
.status.active { background-color: #d4edda; color: #155724; }
.status.inactive { background-color: #f8d7da; color: #721c24; }
.loading, .error-message, .empty-list-message { text-align: center; padding: 2rem; font-size: 1.1rem; color: #6c757d; }
.error-message { color: #dc3545; }
.reviews-container { padding: 1rem; background-color: #f8f9fa; }
</style>