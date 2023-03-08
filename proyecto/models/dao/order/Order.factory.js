import OrderMongoDao from './OrderMongoDB.dao.js';

class OrderDaoFactory {

  static getOrderDao(){
    switch (process.env.TIPO_PERSISTENCIA) { 
      case 'mongo':
        return OrderMongoDao.getInstance()
      default:
        return OrderMongoDao.getInstance();
    }
  }

}

export default OrderDaoFactory