import CartsFileDao from './CartsFile.dao.js';
import CartsMemDao from './CartsMemory.dao.js';
import CartsMongoDao from './CartsMongoDB.dao.js';

class CartsDaoFactory {

  static getCartsDao(){
    switch (process.env.TIPO_PERSISTENCIA) { 
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