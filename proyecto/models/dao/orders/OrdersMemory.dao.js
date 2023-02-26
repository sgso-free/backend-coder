import AccessMemory  from '../../persistence/AccessMemory.js' 
let instance = null

class OrdersMemoryDao extends AccessMemory {

    async save(order) {
        order.timestamp = Date.now(); 
        return super.save(order)
    }

    static getInstance() {
        if (!instance) {
          instance = new OrdersMemoryDao()
        }
        return instance
      }

}

export default  OrdersMemoryDao