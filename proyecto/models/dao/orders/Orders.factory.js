import config from '../../../config.js' 
import OrdersMongoDao from './OrdersMongoDB.dao.js';
s
class OrdersDaoFactory {

  static getOrdersDao(){
    console.log('config.dao.target', config.dao.target);
    switch (config.dao.target) { 
      case 'mongo':
        return OrdersMongoDao.getInstance()
      default:
        return OrdersMemDao.getInstance();
    }
  }

}

export default OrdersDaoFactory