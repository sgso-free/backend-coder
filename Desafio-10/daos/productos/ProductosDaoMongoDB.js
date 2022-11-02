const ContenedorMongoDB  = require('../../contenedores/ContenedorMongoDB.js');
const mongoose = require("mongoose");

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('Producto', new mongoose.Schema({
            "nombre": { type: String, require: true },
            "descripcion": { type: String, require: true },
            "codigo": { type: String, require: true },
            "foto": { type: String, require: true },
            "precio": { type: Number, require: true },
            "stock": { type: Number, require: true },
            "id": { type: Number, require: true },
            "timestamp": { type: Date, default: Date.now },
          }))

          super.connectDb();

        }

    async save(producto) { 
        return super.save(producto)
    }
}
 
module.exports = ProductosDaoMongoDB