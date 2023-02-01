import AccessFile  from '../../persistence/AccessFile.js'

class ProductsFileDao extends AccessFile {

    constructor() {
        super('products.json')
    }

    async save(producto) {
        producto.timestamp = Date.now();
        return super.save(producto)
    }
}
 
export default ProductsFileDao