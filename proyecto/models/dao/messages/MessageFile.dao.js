import AccessFile  from '../../persistence/AccessFile.js'
let instance = null

class MessageFileDao extends AccessFile {

    constructor() {
        super('mensajes.json')
    }

    async save(message) { 
        return super.save(message)
    }

    static getInstance() {
        if (!instance) {
          instance = new MessageFileDao()
        }
        return instance
    }

}
 
export default MessageFileDao