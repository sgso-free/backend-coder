const express = require('express')
const {Router} = express

const routerCarrito = Router(Router)

const userAdmin = false;
const ContenedorCarrito = require('../persistencia/ContenedorCarrito.js');
const ContenedorProducto = require('../persistencia/ContenedorProducto.js');
const carritos = new ContenedorCarrito("./persistencia/carritos.json")
const productos = new ContenedorProducto("./persistencia/products.json")

//recibe y agrega un producto, 
//y devuelve su id asignado.
routerCarrito.post('/', async (req,res)=>{  
    let { body : data } = req
    res.status(200).json(await carritos.save(data)) 
})

 
//devuelve los productos del carrito 
routerCarrito.get('/:id/productos', async (req,res)=>{
    const searchId = parseInt(req.params.id, 10);
    let prFind = await carritos.getById(searchId)
    if (prFind) {
        console.log('Here from router (Get)',prFind)
        res.status(200).json(prFind.productos)
    } else {
        console.log({ error : 'carrito no encontrado' })
        res.send({ error : 'carrito no encontrado' })
    }

    res.status(200).end()
})

 

//elimina un carrito
routerCarrito.delete('/:id',async (req,res)=>{
    
    const searchId = parseInt(req.params.id, 10);
    console.log("Delete id:",searchId);
    await carritos.deleteById(searchId) ;
        
    res.status(200).end()
 
})

//elimina un carrito
routerCarrito.delete('/:id/productos/:id_prod',async (req,res)=>{
    
    const searchId = parseInt(req.params.id, 10);
    const searchIdProd = parseInt(req.params.id_prod, 10);
    console.log("Delete id:",searchId);
    await carritos.deleteByProd(searchId,searchIdProd) ;
        
    res.status(200).end()
 
})


//recibe y agrega un producto, 
//y devuelve su id asignado.
routerCarrito.post('/:id/productos', async (req,res)=>{ 
    
    const searchId = parseInt(req.params.id, 10);
    let { body : data } = req  
    res.status(200).json(await carritos.addProduct(searchId,data)); 

    /*prodArrayId = data.productos; 
    for (const idProd of prodArrayId) {
        let prFind = await productos.getById(idProd)
        if (prFind) {
            console.log('Here from router (Get)',prFind)
            await carritos.addProduct(searchId,prFind) ;
        } else {
            console.log({ error : 'producto no encontrado' })
        }
    }; */

    res.status(200).end()
   
     
})

module.exports = routerCarrito
