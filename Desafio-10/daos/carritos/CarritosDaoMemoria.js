const ContenedorMemoria = require('../../contenedores/ContenedorMemoria.js');

class CarritosDaoMemoria extends ContenedorMemoria {

    async save(carrito = { productos: [] }) {
        carrito.timestamp = Date.now();
        return super.save(carrito)
    }
}

module.exports =  CarritosDaoMemoria