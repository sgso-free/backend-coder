import { buildSchema } from 'graphql'


export default buildSchema (`
  type Product {
    id: ID!
    nombre: String
    description: String
    codigo: String
    foto: String
    precio: String
    stock: String
    timestamp: String
  }
  input ProductInput {
    nombre: String
    description: String
    codigo: String
  }
  type Query {
    getProducts(query: String): [Product]
  }
  type Mutation {
    createProduct(data: ProductInput): Product
  }
`)