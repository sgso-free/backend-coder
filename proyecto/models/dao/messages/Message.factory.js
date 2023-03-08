import MessageMongoDao from './MessageMongoDB.dao.js';

class MessageDaoFactory {

  static getMessageDao(){
    switch (process.env.TIPO_PERSISTENCIA) { 
      case 'mongo':
        return MessageMongoDao.getInstance()
      default:
        return MessageMongoDao.getInstance();
    }
  }

}

export default MessageDaoFactory