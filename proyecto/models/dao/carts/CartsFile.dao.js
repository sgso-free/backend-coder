import AccessFile  from '../../persistence/AccessFile.js'
let instance = null

class CarritosFileDao extends AccessFile {

    constructor() {
        super('carritos.json')
    }

    async save(carrito = {}) {
        carrito.timestamp = Date.now();
        carrito.items = [];
        return super.save(carrito)
    }
 
    async deleteByProd (searchId,searchIdProd) {
         super.deleteOneFromArray(searchId,"items",searchIdProd)
    }

    async addProduct (searchId,dataProd) {
        super.addOneInArray(searchId,"items",dataProd)
   }
    
   static getInstance() {
    if (!instance) {
      instance = new CarritosFileDao()
    }
    return instance
  }

}

export default  CarritosFileDao