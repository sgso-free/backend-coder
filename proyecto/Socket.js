import { Server } from 'socket.io'
import { schema, normalize, denormalize } from 'normalizr'

import MessageFactory from './models/dao/messages/Message.factory.js' 
const messages = MessageFactory.getMessageDao() 

const authorSchema = new schema.Entity('author',{},{idAttribute: 'email'})

const mensajeSchema = new schema.Entity('mensaje', {
    author: authorSchema 
}) 
const mensajesSchema = new schema.Entity('mensajes', { 
  mensajes: [mensajeSchema]
})

let io
  
class Socket {

  static async init(httpServer) {
    console.log('Configurando el socket')
    let io = new Server(httpServer)
  

    io.on('connection', async (clienteSocket) => {
      console.log('Nuevo cliente conectado', clienteSocket.id)
 
      let allMensj = await messages.getAll()
      let normMensj = {id : "999", "mensajes":allMensj}
      const dataNormalized = normalize(normMensj, mensajesSchema)

      console.log(dataNormalized)
      
      clienteSocket.emit('inicio',dataNormalized)

      clienteSocket.on('nuevo-mensaje', (data) => { 
        //mensajes.push({ socketID: clienteSocket.id, mensaje: data, fecha: new Date(), email:name })
        //console.log(clienteSocket.id)
        data.fecha = new Date()
        data.socketID = clienteSocket.id
        mensajes.save(data)
        io.emit('notificacion-mensaje',data)
      })
 
      clienteSocket.on('disconnect', () => {
        console.log('Cliente desconectado')
      })
    })
  }
}

module.exports = Socket