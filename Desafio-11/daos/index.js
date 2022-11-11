 
let mensajesDao

  
    switch (process.env.TIPO_PERSISTENCIA) {
        case 'json': 
            const MensajesDaoArchivo = require('./mensajes/MensajesDaoArchivo.js')
 
            mensajesDao = new MensajesDaoArchivo()
            break
          

        default: 
            const  MensajesDaoMem   = require('./carritos/MensajesDaoMemoria.js')
 
            mensajesDao = new MensajesDaoMem()
    }
 
  module.exports =  {  mensajesDao }