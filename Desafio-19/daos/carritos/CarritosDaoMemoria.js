const ContenedorMemoria = require('../../persistencia/ContenedorMemoria.js');

class CarritosDaoMemoria extends ContenedorMemoria {

    async save(carrito = {}) {
        carrito.timestamp = Date.now();
        carrito.productos = [];
        return super.save(carrito)
    }

    async deleteByProd (searchId,searchIdProd) {
        super.deleteOneFromArray(searchId,"productos",searchIdProd)
    }

    async addProduct (searchId,dataProd) {
        super.addOneInArray(searchId,"productos",dataProd)
    }

}

module.exports =  CarritosDaoMemoria