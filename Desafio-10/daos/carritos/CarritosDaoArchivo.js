const ContenedorArchivo  = require('../../contenedores/ContenedorArchivo.js');

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('carritos.json')
    }

    async save(carrito = { productos: [] }) {
        carrito.timestamp = Date.now();
        return super.save(carrito)
    }
}

module.exports =  CarritosDaoArchivo