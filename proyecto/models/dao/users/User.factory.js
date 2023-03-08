import UserMongoDao from './UserMongoDB.dao.js';

class UserDaoFactory {

  static getUserDao(){
    switch (process.env.TIPO_PERSISTENCIA) { 
      case 'mongo':
        return UserMongoDao.getInstance()
      default:
        return UserMongoDao.getInstance();
    }
  }

}

export default UserDaoFactory