const { Server } = require('socket.io')

let io

//DB
const Mensajes =  require('./persistencia/Mensajes.js')
const Productos =  require('./persistencia/Productos.js')
   
class Socket {

  static async init(httpServer) {
    console.log('Configurando el socket')
    let io = new Server(httpServer)

    let mensajes = new Mensajes();
    let productos = new Productos();
    try {
      await productos.createTableProductos()  
      await mensajes.createTableMensajes()  
    } catch (error) {
      console.error(error.message)
    }

    io.on('connection', async (clienteSocket) => {
      console.log('Nuevo cliente conectado', clienteSocket.id)
 
      let allMensj = await mensajes.getMensajes()
      
      let allProd = await productos.getProductos()
      console.log('PRoductos', allProd)
      clienteSocket.emit('inicio',allMensj , allProd)

      clienteSocket.on('nuevo-mensaje', (data,name) => { 
        //mensajes.push({ socketID: clienteSocket.id, mensaje: data, fecha: new Date(), email:name })
        mensajes.insertMensaje([{ socketID: clienteSocket.id, mensaje: data, fecha: new Date(), email:name }])
        io.emit('notificacion-mensaje',{ socketID: clienteSocket.id, mensaje: data, fecha: new Date(), email:name})
      })

      clienteSocket.on('nuevo-producto', (title,price,thumbnail) => { 
       
        let data = {"nombre":title,"precio":price,"thumbnail":thumbnail} 
        console.log('DATAAAA',data)
        data["thumbnail"]=`${process.env.BASE_HOST}/images/`+data["thumbnail"] 
        console.log('DATAAAA',data)
        productos.insertProducto([data]) 
        io.emit('notificacion-producto',data)
      })

      clienteSocket.on('disconnect', () => {
        console.log('Cliente desconectado')
      })
    })
  }
}

module.exports = Socket