import config from '../../../config.js' 
import OrderMongoDao from './OrderMongoDB.dao.js';

class OrderDaoFactory {

  static getOrderDao(){
    console.log('config.dao.target', config.dao.target);
    switch (config.dao.target) { 
      case 'mongo':
        return OrderMongoDao.getInstance()
      default:
        return OrderMongoDao.getInstance();
    }
  }

}

export default OrderDaoFactory