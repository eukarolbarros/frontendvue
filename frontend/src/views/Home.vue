<template>
  <div>
    <ProductList @open-form="openForm" @notify="showNotification" ref="productListRef" />
    <ProductForm
      v-if="isFormVisible"
      :model="editingProduct"
      @cancel="closeForm"
      @save="handleSave"
    />
    <Notification
      :message="notification.message"
      :type="notification.type"
      v-if="notification.visible"
      @close="hideNotification"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductList from '@/components/ProductList.vue'
import ProductForm from '@/components/ProductForm.vue'
import Notification from '@/components/Notification.vue'
import productService from '@/services/productService'

const isFormVisible = ref(false)
const editingProduct = ref(null)
const productListRef = ref(null)

const notification = ref({
  visible: false,
  message: '',
  type: 'success',
})

const showNotification = (message, type = 'success') => {
  notification.value = { visible: true, message, type }
  setTimeout(() => {
    hideNotification()
  }, 3000)
}

const hideNotification = () => {
  notification.value.visible = false
}

const openForm = (product) => {
  editingProduct.value = product
  isFormVisible.value = true
}

const closeForm = () => {
  isFormVisible.value = false
  editingProduct.value = null
}

const handleSave = async (productData) => {
  try {
    if (productData.id) {
      await productService.updateProduct(productData.id, productData)
      showNotification('Product updated successfully!')
    } else {
      await productService.createProduct(productData)
      showNotification('Product created successfully!')
    }
    closeForm()
    productListRef.value.fetchProducts()
  } catch (_) {
    showNotification('Failed to save product.', 'error')
  }
}
</script>