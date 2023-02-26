import AccessMongoDB  from '../../persistence/AccessMongoDB.js' 
import MessageSchema from './Message.schema.js'  

let instance = null

class MessageMongoDBDao extends AccessMongoDB {

    constructor() {
        super('Message', MessageSchema)

        super.connectDb();

    }

    async save(message) { 
        return super.save(message)
    }

    static getInstance() {
        if (!instance) {
          instance = new MessageMongoDBDao()
        }
        return instance
      }

}
 
export default MessageMongoDBDao