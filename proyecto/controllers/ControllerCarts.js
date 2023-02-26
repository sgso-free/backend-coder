const userAdmin = true;
import CartsFactory from '../models/dao/carts/Carts.factory.js' 
const carritos = CartsFactory.getCartsDao()
 

//recibe y agrega un producto, 
//y devuelve su id asignado.
const nuevoCarrito = async (req, res) => { 
    try {
        let { body : data } = req
        res.status(200).json(await carritos.save(data)) 
    } catch(error) {
        res.status(200).json(`{error:-2,descripcion:${error.message}}`)
    } 
} 

 
//devuelve los productos del carrito  
const listarProductosCarrito = async (req, res) => { 
        try {
            const searchId = req.params.id; //id carrito
            let prFind = await carritos.getById(searchId)
            if (prFind) {
                //console.log('Here from router (Get)',prFind)
                //console.log('Here from router (Productos)',prFind.productos)
                //console.log('Here from router (Productos)',prFind._id)
                res.status(200).json(prFind.products)
            } else {
                //console.log({ error : 'carrito no encontrado' })
                res.send({ error : 'carrito no encontrado' })
            }

            res.status(200).end()

        } catch(error) {
            res.status(200).json(`{error:-2,descripcion:${error.message}}`)
        } 
}

 

//elimina un carrito
const eliminarCarrito = async (req, res) => { 
        try {    
            const searchId = req.params.id;
            //console.log("Delete id:",searchId);
            await carritos.deleteById(searchId) ;
                
            res.status(200).end()
        } catch(error) {
            res.status(200).json(`{error:-2,descripcion:${error.message}}`)
        } 
 
}

//elimina un producto del carrito
const eliminarProductoCarrito = async (req, res) => { 
        try {       
            const searchId = req.params.id;
            const searchIdProd = req.params.id_prod;
            //console.log("Delete id:",searchId);
            await carritos.deleteByProd(searchId,searchIdProd) ;
                
            res.status(200).end()
        } catch(error) {
            res.status(200).json(`{error:-2,descripcion:${error.message}}`)
        } 
}


//recibe y agrega un producto, 
//y devuelve su id asignado. 
const agregarProductoCarrito = async (req, res) => { 
    try { 
        const searchId = req.params.id;
        let { body : data } = req  
        console.log("Agregar producto")
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
    } catch(error) {
        res.status(200).json(`{error:-2,descripcion:${error.message}}`)
    } 
     
}

export default {nuevoCarrito, listarProductosCarrito, eliminarCarrito, eliminarProductoCarrito, agregarProductoCarrito}
