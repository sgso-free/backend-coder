const ContenedorMongoDB  = require('../../contenedores/ContenedorMongoDB.js');
const mongoose = require("mongoose");
const productoSchema = require('../../models/productoSchema.js');

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('Producto', productoSchema)

          super.connectDb();

        }

    async save(producto) { 
        return super.save(producto)
    }
}
 
module.exports = ProductosDaoMongoDB