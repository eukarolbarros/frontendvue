import api from './api'

export default {
  getReviewsForProduct(productId) {
    return api.get(`/reviews?productId=${productId}`)
  },
  createReview(data) {
    return api.post('/reviews', data)
  },
  updateReview(id, data) {
    return api.put(`/reviews/${id}`, data)
  },
  deleteReview(id) {
    return api.delete(`/reviews/${id}`)
  },
}
