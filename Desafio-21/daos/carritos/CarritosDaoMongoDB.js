const { Schema } = require('mongoose')

const ContenedorMongoDB = require('../../persistencia/ContenedorMongoDB.js');
const carritoSchema =  require('../../models/carritoSchema.js')

class CarritosDaoMongoDB extends ContenedorMongoDB {

  constructor() {
    console.log('CarritosDaoMongoDB Here')

    //create the schema of the object, and send the colletion use for this.
    super('Carrito', carritoSchema)
  }

  async save(carrito = { productos: [] }) {
    return super.save(carrito)
  }
 
  async deleteByProd (searchId,searchIdProd) {
    super.deleteOneFromArray(searchId,"productos",searchIdProd)
  }

  async addProduct (searchId,dataProd) {
    super.addOneInArray(searchId,"productos",dataProd)
  }


}

module.exports =  CarritosDaoMongoDB