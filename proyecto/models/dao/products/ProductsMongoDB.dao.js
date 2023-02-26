import AccessMongoDB  from '../../persistence/AccessMongoDB.js' 
import ProductSchema from './Product.schema.js'  

let instance = null

class ProductsMongoDBDao extends AccessMongoDB {

    constructor() {
        super('Producto', ProductSchema)

        super.connectDb();

    }

    async save(producto) { 
        return super.save(producto)
    }

    static getInstance() {
        if (!instance) {
          instance = new ProductsMongoDBDao()
        }
        return instance
      }

}
 
export default ProductsMongoDBDao