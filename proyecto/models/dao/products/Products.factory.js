import ProductsFileDao from './ProductsFile.dao.js';
import ProductsMemDao from './ProductsMemory.dao.js';
import ProductsMongoDao from './ProductsMongoDB.dao.js';

class ProductsDaoFactory {

  static getProductsDao(){
    console.log('config.dao.target product', config.dao.target);
    switch (process.env.TIPO_PERSISTENCIA) { 
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