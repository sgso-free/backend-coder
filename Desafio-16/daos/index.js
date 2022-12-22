
let UserDao

  
    switch (process.env.TIPO_PERSISTENCIA) {
         
        /*case 'mongodb':
            const UserDaoMongoDB = require('./UserDaoMongoDB.js')  
            userDao = new UserDaoMongoDB() 
            break
        */
         
        default:
          const UserDaoMongoDB = require('./UserDaoMongoDB.js')  
          UserDao = new UserDaoMongoDB() 
    }
 
  module.exports =  { UserDao}