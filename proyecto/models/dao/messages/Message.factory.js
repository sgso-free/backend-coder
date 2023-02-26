import config from '../../../config.js' 
import MessageMongoDao from './MessageMongoDB.dao.js';

class MessageDaoFactory {

  static getMessageDao(){
    console.log('config.dao.target', config.dao.target);
    switch (config.dao.target) { 
      case 'mongo':
        return MessageMongoDao.getInstance()
      default:
        return MessageMongoDao.getInstance();
    }
  }

}

export default MessageDaoFactory