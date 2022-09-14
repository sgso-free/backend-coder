
const express = require('express');
const Contenedor = require('./Contenedor.js')


const app = express()
const productos = new Contenedor("products.json")
const PORT = process.env.PORT

const server = app.listen(PORT,()=>{
    console.log("Listen servise ..."+server.address().port)
})

app.get('/productos', async (req,res)=>{
  console.log("Get All Product") 
  res.send(await productos.getAll())
})
app.get('/productoRandom', async (req,res)=>{
     res.send(await productos.getByRandom())
})
server.on("Error",()=>{
    console.log('Error')
})
