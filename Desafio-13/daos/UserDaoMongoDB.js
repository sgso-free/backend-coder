const ContenedorMongoDB  = require('../contenedores/ContenedorMongoDB.js');
const mongoose = require("mongoose");
const UserSchema = require('../models/UserSchema.js');

class UserDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('user', UserSchema)

          super.connectDb();

        }

    async save(user) { 
        console.log("Entro save user")
        return super.save(user)
    }
}
 
module.exports = UserDaoMongoDB