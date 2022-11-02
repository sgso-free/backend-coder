const express = require('express')
const {Router} = express

const routerProducto = Router(Router)

const userAdmin = true;
const api = require('../daos/index.js');  
const productos = api.productosDao;

//recibe y agrega un producto, 
//y devuelve su id asignado.
routerProducto.post('/', async (req,res)=>{ 
    if (userAdmin) {
        let { body : data } = req
        res.status(200).json(await productos.save(data))
    } else {
        res.status(200).json('{error:-1,descripcion:"ruta /productos metodo post no autorizada"');
    }
     
})

//devuelve todos los productos
routerProducto.get('/', async(_,res)=>{
    res.status(200).json(await productos.getAll())
})

//devuelve un producto según su id.
routerProducto.get('/:id', async (req,res)=>{
    const searchId = parseInt(req.params.id, 10);
    let prFind = await productos.getById(searchId)
    if (prFind) {
        console.log('Here from router (Get)',prFind)
        res.send(prFind)
    } else {
        console.log({ error : 'producto no encontrado' })
        res.send({ error : 'producto no encontrado' })
    }

    res.status(200).end()
})

//actualiza un producto
routerProducto.put('/:id',async(req,res)=>{
    if (userAdmin) {
        const searchId = parseInt(req.params.id, 10);
        let { body : data } = req
        console.log(data)
        /*let prFind = productos.find((pr) => pr.id == searchId) 
        if (prFind) {
            prFind.title=data.title
            prFind.precio=data.precio
            prFind.thumbnail=data.thumbnail        
            res.send(prFind)
        } else {
            res.send({ error : 'producto no encontrado' })
        }*/

        res.status(200).end()

    } else {
        res.status(200).json('{error:-1,descripcion:"ruta /productos metodo put no autorizada"');
    }

})

//elimina un producto
routerProducto.delete('/:id',async (req,res)=>{
    if (userAdmin) {
        const searchId = parseInt(req.params.id, 10);
        console.log("Delete id:",searchId);
        await productos.deleteById(searchId);
        res.status(200).end()

    } else {
        res.status(200).json('{error:-1,descripcion:"ruta /productos metodo delete no autorizada"');
    }
})

module.exports = routerProducto
