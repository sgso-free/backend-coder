const ContenedorFirebase  = require('../../persistencia/ContenedorFirebase.js'); 

class CarritosDaoFirebase extends ContenedorFirebase {

    constructor(firebaseAdmin) {
        super('Carrito',firebaseAdmin)
    }

    async save(carrito = { productos: [] }) { 
        carrito.timestamp = Date.now();
        return super.save(carrito)
    }
}
 
module.exports = CarritosDaoFirebase