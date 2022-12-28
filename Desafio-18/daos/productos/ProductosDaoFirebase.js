const ContenedorFirebase  = require('../../contenedores/ContenedorFirebase.js'); 

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor(firebaseAdmin) {
        super('Producto',firebaseAdmin)
    }

    async save(producto) { 
        producto.timestamp = Date.now();
        return super.save(producto)
    }
}
 
module.exports = ProductosDaoFirebase