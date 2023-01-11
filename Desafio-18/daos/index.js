let ProductosDao
let CarritosDao
let UserDao
let MensajesDao

  
    switch (process.env.TIPO_PERSISTENCIA) {
        case 'json':
            const ProductosDaoArchivo  = require('./productos/ProductosDaoArchivo.js')
            const CarritosDaoArchivo = require('./carritos/CarritosDaoArchivo.js')

            ProductosDao = new ProductosDaoArchivo()
            CarritosDao = new CarritosDaoArchivo()
            break

          case 'mongodb':
            const ProductosDaoMongoDB = require('./productos/ProductosDaoMongoDB.js')
            const CarritosDaoMongoDB   = require('./carritos/CarritosDaoMongoDB.js') 

            ProductosDao = new ProductosDaoMongoDB()
            CarritosDao = new CarritosDaoMongoDB()  

            break

          case 'firebase':
            const config = require('../config.js') 
            const firebaseAdmin = require("firebase-admin");
             
            firebaseAdmin.initializeApp({ 
              credential: firebaseAdmin.credential.cert(config.firebase.firebaseConfig)
            });

            const ProductosDaoFirebase = require('./productos/ProductosDaoFirebase.js')
            const CarritosDaoFirebase   = require('./carritos/CarritosDaoFirebase.js')

            ProductosDao = new ProductosDaoFirebase(firebaseAdmin)
            CarritosDao = new CarritosDaoFirebase(firebaseAdmin)
            break

        default:
            const ProductosDaoMem   = require('./productos/ProductosDaoMemoria.js')
            const  CarritosDaoMem   = require('./carritos/CarritosDaoMemoria.js')
            

            ProductosDao = new ProductosDaoMem()
            CarritosDao = new CarritosDaoMem()
            
    }

    //only MongoDB
    const UserDaoMongoDB = require('./user/UserDaoMongoDB.js')
    UserDao = new UserDaoMongoDB()
 
    const MensajesDaoArchivo = require('./mensajes/MensajesDaoArchivo.js')
    MensajesDao = new MensajesDaoArchivo()

  module.exports =  { ProductosDao, CarritosDao, UserDao, MensajesDao }