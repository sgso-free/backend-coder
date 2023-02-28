import AccessMongoDB  from '../../persistence/AccessMongoDB.js' 
import  Schema from './Order.schema.js'  

let instance = null

class OrderMongoDBDao extends AccessMongoDB {

  constructor() {
    //console.log('CarritosDaoMongoDB Here')

    //create the schema of the object, and send the colletion use for this.
    super('Order', Schema.OrderSchema)
    super.connectDb();
    
  }

  async save( ) {
    return super.save(order)
  }
   
  static getInstance() {
    if (!instance) {
      instance = new CarritosMongoDBDao()
    }
    return instance
  }

}

export default CarritosMongoDBDao 