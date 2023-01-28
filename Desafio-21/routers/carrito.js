const express = require('express')
const {Router} = express

const routerCarrito = Router(Router)

const userAdmin = false;

const api = require('../daos/servicios.js');  
const carritos = api.CarritosDao;

//recibe y agrega un producto, 
//y devuelve su id asignado.
routerCarrito.post('/', async (req,res)=>{  
    let { body : data } = req
    res.status(200).json(await carritos.save(data)) 
})

 
//devuelve los productos del carrito 
routerCarrito.get('/:id/productos', async (req,res)=>{
    const searchId = req.params.id;
    let prFind = await carritos.getById(searchId)
    if (prFind) {
        //console.log('Here from router (Get)',prFind)
        //console.log('Here from router (Productos)',prFind.productos)
        //console.log('Here from router (Productos)',prFind._id)
        res.status(200).json(prFind.productos)
    } else {
        //console.log({ error : 'carrito no encontrado' })
        res.send({ error : 'carrito no encontrado' })
    }

    res.status(200).end()
})

 

//elimina un carrito
routerCarrito.delete('/:id',async (req,res)=>{
    
    const searchId = req.params.id;
    //console.log("Delete id:",searchId);
    await carritos.deleteById(searchId) ;
        
    res.status(200).end()
 
})

//elimina un carrito
routerCarrito.delete('/:id/productos/:id_prod',async (req,res)=>{
    
    const searchId = req.params.id;
    const searchIdProd = req.params.id_prod;
    //console.log("Delete id:",searchId);
    await carritos.deleteByProd(searchId,searchIdProd) ;
        
    res.status(200).end()
 
})


//recibe y agrega un producto, 
//y devuelve su id asignado.
routerCarrito.post('/:id/productos', async (req,res)=>{ 
    
    const searchId = req.params.id;
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
