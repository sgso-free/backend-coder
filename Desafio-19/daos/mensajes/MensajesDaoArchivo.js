const ContenedorArchivo  = require('../../persistencia/ContenedorArchivo.js');

class MensajesDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('mensajes.json')
    }

    async save(mensaje) { 
        return super.save(mensaje)
    }
}
 
module.exports = MensajesDaoArchivo