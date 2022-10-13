const express = require('express')
const path = require('path')
const { parsed, error } = require("dotenv").config();

//const {engine} = require('hbs')

//var indexRouter = require('./routers/index');
const productosRouter = require('./routers/routerProducto')
const carritoRouter = require('./routers/routerCarrito')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
 
app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)
//app.use('/', indexRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.get('*', function(req, res){
  console.log(req.baseUrl)
  res.status(404).json(`{error:-2,descripcion:"ruta ${req.baseUrl} metodo get no autorizada"}`);
})

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

module.exports = app;