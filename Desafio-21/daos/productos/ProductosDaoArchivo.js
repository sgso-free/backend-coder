const ContenedorArchivo  = require('../../persistencia/ContenedorArchivo.js');

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('productos.json')
    }

    async save(producto) {
        producto.timestamp = Date.now();
        return super.save(producto)
    }
}
 
module.exports = ProductosDaoArchivo