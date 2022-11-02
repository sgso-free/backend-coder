const { Schema } = require('mongoose')

const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB.js');

class CarritosDaoMongoDB extends ContenedorMongoDB {

  constructor() {
    console.log('CarritosDaoMongoDB Here')

    //create the schema of the object, and send the colletion use for this.
    super('Carrito', new Schema({
      "productos": { type: [], require: true },
      "id": { type: Number, require: true },
      "timestamp": { type: Date, default: Date.now }
    }))
  }

  async save(carrito = { productos: [] }) {
    return super.save(carrito)
  }
}

module.exports =  CarritosDaoMongoDB