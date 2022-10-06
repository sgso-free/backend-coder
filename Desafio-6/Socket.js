const { Server } = require('socket.io')

let io

const mensajes = [{
  socketID: '1234',
  email: 'coder@coder.com',
  mensaje: 'Coder House',
  fecha: new Date()
}]

const productos = [
  {
    id: 1,
    title: 'Escuadra',
    price:15,
    thumbnail: `${process.env.BASE_HOST}/images/regla.png`
  },
]

let siguienteID = 2

class Socket {

  static init(httpServer) {
    console.log('Configurando el socket')
    io = new Server(httpServer)
    io.on('connection', (clienteSocket) => {
      console.log('Nuevo cliente conectado', clienteSocket.id)

      clienteSocket.emit('inicio', mensajes, productos)

      clienteSocket.on('nuevo-mensaje', (data,name) => { 
        mensajes.push({ socketID: clienteSocket.id, mensaje: data, fecha: new Date(), email:name })
        io.emit('notificacion-mensaje',{ socketID: clienteSocket.id, mensaje: data, fecha: new Date(), email:name})
      })

      clienteSocket.on('nuevo-producto', (title,price,thumbnail) => { 

        data = { id: siguienteID, title:title,price:price,thumbnail:''} 
        data["thumbnail"]=`${process.env.BASE_HOST}/images/`+data["thumbnail"] 
        productos.push(data)
        siguienteID++ 
        io.emit('notificacion-producto',{ ...data})
      })

      clienteSocket.on('disconnect', () => {
        console.log('Cliente desconectado')
      })
    })
  }
}

module.exports = Socket