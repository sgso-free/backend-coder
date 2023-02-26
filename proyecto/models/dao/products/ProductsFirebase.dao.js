import AccessFirebase  from  require('../../persistence/AccessFirebase.js'); 
let instance = null
class ProductsFirebaseDao extends AccessFirebase {

    constructor(firebaseAdmin) {
        super('Producto',firebaseAdmin)
    }

    async save(producto) { 
        producto.timestamp = Date.now();
        return super.save(producto)
    }

    static getInstance() {
        if (!instance) {
          instance = new ProductsFirebaseDao()
        }
        return instance
      }

}
 
export default ProductsFirebaseDao
