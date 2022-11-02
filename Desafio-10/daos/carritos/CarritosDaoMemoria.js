const ContenedorMemoria = require('../../contenedores/ContenedorMemoria.js');

class CarritosDaoMemoria extends ContenedorMemoria {

    async save(carrito = { productos: [] }) {
        return super.save(carrito)
    }
}

module.exports =  CarritosDaoMemoria