import AccessFile  from '../../persistence/AccessFile.js'
let instance = null

class ProductsFileDao extends AccessFile {

    constructor() {
        super('products.json')
    }

    async save(producto) {
        producto.timestamp = Date.now();
        return super.save(producto)
    }

    static getInstance() {
        if (!instance) {
          instance = new ProductsFileDao()
        }
        return instance
      }

}
 
export default ProductsFileDao