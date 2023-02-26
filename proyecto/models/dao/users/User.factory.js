import config from '../../../config.js' 
import UserMongoDao from './UserMongoDB.dao.js';

class UserDaoFactory {

  static getUserDao(){
    console.log('config.dao.target', config.dao.target);
    switch (config.dao.target) { 
      case 'mongo':
        return UserMongoDao.getInstance()
      default:
        return UserMongoDao.getInstance();
    }
  }

}

export default UserDaoFactory