const ContenedorArchivo  = require('../../contenedores/ContenedorArchivo.js');

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('carritos.json')
    }

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

module.exports =  CarritosDaoArchivo