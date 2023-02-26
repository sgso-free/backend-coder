import AccessMemory  from '../../persistence/AccessMemory.js' 
let instance = null

class CarritosMemoryDao extends AccessMemory {

    async save(carrito = {}) {
        carrito.timestamp = Date.now();
        carrito.products = [];
        return super.save(carrito)
    }

    async deleteByProd (searchId,searchIdProd) {
        super.deleteOneFromArray(searchId,"products",searchIdProd)
    }

    async addProduct (searchId,dataProd) {
        super.addOneInArray(searchId,"products",dataProd)
    }

    static getInstance() {
        if (!instance) {
          instance = new CarritosMemoryDao()
        }
        return instance
      }

}

export default  CarritosMemoryDao