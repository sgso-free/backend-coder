import AccessMongoDB  from '../../persistence/AccessMongoDB.js' 
import OrderSchema from './Orders.schema.js'  

let instance = null

class OrdersMongoDBDao extends AccessMongoDB {

  constructor() {  
    //create the schema of the object, and send the colletion use for this.
    super('Orders', OrderSchema)
  }

  async save(order) {
    return super.save(order)
  }
 
  static getInstance() {
    if (!instance) {
      instance = new OrdersMongoDBDao()
    }
    return instance
  }

}

export default OrdersMongoDBDao