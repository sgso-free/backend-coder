import config from '../../../config.js'
import CartsFileDao from './CartsFile.dao.js';
import CartsMemDao from './CartsMemory.dao.js';
import CartsMongoDao from './CartsMongoDB.dao.js';

class CartsDaoFactory {

  static getCartsDao(){
    console.log('config.dao.target', config.dao.target);
    switch (config.dao.target) {
      case 'file':
        return CartsFileDao.getInstance()
      case 'mongo':
        return CartsMongoDao.getInstance()
      default:
        return CartsMemDao.getInstance();
    }
  }

}

export default CartsDaoFactory