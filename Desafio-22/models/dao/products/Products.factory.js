import config from '../../../config.js'
import ProductsFileDao from './ProductsFile.dao.js';
import ProductsMemDao from './ProductsMemory.dao.js';
import ProductsMongoDao from './ProductsMongoDB.dao.js';

class ProductsDaoFactory {

  static getProductsDao(){
    console.log('config.dao.target', config.dao.target);
    switch (config.dao.target) {
      case 'file':
        return ProductsFileDao.getInstance()
      case 'mongo':
        return ProductsMongoDao.getInstance()
      default:
        return ProductsMemDao.getInstance();
    }
  }

}

export default ProductsDaoFactory