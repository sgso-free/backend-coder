import AccessMongoDB  from '../../persistence/AccessMongoDB.js' 
import  Schema from './Carts.schema.js'  

let instance = null

class CarritosMongoDBDao extends AccessMongoDB {

  constructor() {
    //console.log('CarritosDaoMongoDB Here')

    //create the schema of the object, and send the colletion use for this.
    super('Carrito', Schema.CartSchema)
    super.connectDb();
    
  }

  async save(carrito = { products: [] }) {
    return super.save(carrito)
  }
 
  async deleteByProd (searchId,searchIdProd) {
    console.log("Aqui ",searchId,searchIdProd)
    super.deleteOneFromArray(searchId,"products",searchIdProd)
  }

  async addProduct (searchId,dataProd) {
    super.addOneInArray(searchId,"products",dataProd)
  }


  static getInstance() {
    if (!instance) {
      instance = new CarritosMongoDBDao()
    }
    return instance
  }

}

export default CarritosMongoDBDao 