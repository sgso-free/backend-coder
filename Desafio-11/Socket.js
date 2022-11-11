const { Server } = require('socket.io')
const { schema, normalize, denormalize } = require('normalizr') 

const api = require('./daos/index.js');  
const mensajes= api.mensajesDao;

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
 
      let allMensj = await mensajes.getAll()
      let normMensj = {id : "999", "mensajes":allMensj}
      const dataNormalized = normalize(normMensj, mensajesSchema)
       
      clienteSocket.emit('inicio',dataNormalized)

      clienteSocket.on('nuevo-mensaje', (data) => { 
        //mensajes.push({ socketID: clienteSocket.id, mensaje: data, fecha: new Date(), email:name })
        console.log(clienteSocket.id)
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