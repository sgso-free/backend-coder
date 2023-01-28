const ContenedorMemoria  = require('../../persistencia/ContenedorMemoria.js');

class ProductosDaoMemoria extends ContenedorMemoria {

    constructor() {
        super('productos.json')
    }

    async save(producto) {
        producto.timestamp = Date.now();
        return super.save(producto)
    }
}
 
module.exports = ProductosDaoMemoria