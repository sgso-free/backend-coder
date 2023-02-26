import AccessMemory  from '../../persistence/AccessMemory.js' 
let instance = null
class ProductsMemoryDao extends AccessMemory {

    constructor() {
        super('productos.json')
    }

    async save(producto) {
        producto.timestamp = Date.now();
        return super.save(producto)
    }


    static getInstance() {
        if (!instance) {
          instance = new ProductsMemoryDao()
        }
        return instance
      }

}
 
export default  ProductsMemoryDao