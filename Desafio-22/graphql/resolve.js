import ProductService from '../services/Products.services.js'

export function getProducts() {
  return ProductService
    .getInstance()
    .get()
}

export function createProduct({ data }) {
  return ProductService
    .getInstance()
    .create(data)
}
