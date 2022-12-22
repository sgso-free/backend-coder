const ContenedorMongoDB  = require('../contenedores/ContenedorMongoDB.js');
const mongoose = require("mongoose");
const UserSchema = require('../models/UserSchema.js');

class UserDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('user', UserSchema)

          super.connectDb();

        }

    async save(user) {  
        return super.save(user)
    }

    async getByUserName (username) {
        return super.getOneByQuery({username:username})
    }

    async getCheckUser (username,password) {
        console.log("entre al checkuser")
        try {
            let user = await super.getOneByQuery({username:username})
            
            if (!user) {
                console.log(`User with ${username} not found.`)
                return null
            }
            let match = await user.matchPassword(password)
            if (!match) {
                console.log('Invalid Password')
                return null
            }
            console.log(`User with ${username}`,user)
            return user 
            
        } catch(error) {
            console.log('Error in checkUser', error.message)
            throw new Error(`An error when check user(in getCheckUser): ${error.message}`)
        }

        
    }

}
 
module.exports = UserDaoMongoDB