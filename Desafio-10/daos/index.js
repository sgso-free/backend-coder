let productosDao
let carritosDao

  
    switch (process.env.TIPO_PERSISTENCIA) {
        case 'json':
            const ProductosDaoArchivo  = require('./productos/ProductosDaoArchivo.js')
            const CarritosDaoArchivo = require('./carritos/CarritosDaoArchivo.js')

            productosDao = new ProductosDaoArchivo()
            carritosDao = new CarritosDaoArchivo()
            break
          case 'mongodb':
            const ProductosDaoMongoDB = require('./productos/ProductosDaoMongoDB.js')
            const CarritosDaoMongoDB   = require('./carritos/CarritosDaoMongoDB.js')

            productosDao = new ProductosDaoMongoDB()
            carritosDao = new CarritosDaoMongoDB()
            break
        default:
            const ProductosDaoMem   = require('./productos/ProductosDaoMemoria.js')
            const  CarritosDaoMem   = require('./carritos/CarritosDaoMemoria.js')

            productosDao = new ProductosDaoMem()
            carritosDao = new CarritosDaoMem()
    }
 
  module.exports =  { productosDao, carritosDao }