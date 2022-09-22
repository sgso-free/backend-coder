const express = require('express')
const {Router} = express

const router = Router(Router)


const productos = [
    {
      id: 1,
      title: 'Escuedra',
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    },
  ]
  
  let siguienteID = 2

//recibe y agrega un producto, 
//y lo devuelve con su id asignado.
router.post('/productos',(req,res)=>{ 
    let { body : data } = req
    data = { id: siguienteID, ...data } 
    productos.push(data)
    siguienteID++
    res.status(200).json(data) 
})

//devuelve todos los productos
router.get('/productos',(_,res)=>{
    res.status(200).json(productos)
})

//devuelve un producto según su id.
router.get('/productos/:id',(req,res)=>{
    const searchId = parseInt(req.params.id, 10);
    let prFind = productos.find((pr) => pr.id == searchId) 
    if (prFind) {
        console.log('Here from router (Get)',prFind)
        res.send(prFind)
    } else {
        console.log({ error : 'producto no encontrado' })
        res.send({ error : 'producto no encontrado' })
    }

    res.status(200).end()
})

//modifica un producto
router.put('/productos/:id',(req,res)=>{
    const searchId = parseInt(req.params.id, 10);
    let { body : data } = req
    let prFind = productos.find((pr) => pr.id == searchId) 
    if (prFind) {
        prFind.title=data.title
        prFind.precio=data.precio
        prFind.thumbnail=data.thumbnail        
        res.send(prFind)
    } else {
        res.send({ error : 'producto no encontrado' })
    }

    res.status(200).end()
})

//elimina un producto
router.delete('/productos/:id',(req,res)=>{
    const searchId = parseInt(req.params.id, 10);
    console.log("Delete id:",searchId)
    indx = productos.findIndex((pr) => pr.id == searchId);
    console.log("Index:",indx)
    if (indx>=0) {
        prSlice = productos.splice(indx,1);
        console.log("Clean:",prSlice)
    }
        
    res.status(200).end()
})

module.exports = router
