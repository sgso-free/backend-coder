const userAdmin = true;
import CartsFactory from '../models/dao/carts/Carts.factory.js' 
import UserFactory from '../models/dao/users/User.factory.js' 
import ProductsFactory from '../models/dao/products/Products.factory.js' 

//recibe y agrega un producto, 
//y devuelve su id asignado.
const nuevoCarrito = async (req, res) => { 
    try {
        
        const { username } = req.body
      
        const data = {
            username:username 
        }
 
        //chequear el usuario
        const users = UserFactory.getUserDao() 
        const usersFind = await users.getByUserName(username) 

        if (usersFind) { 
            //creo carrito
            const carritos = CartsFactory.getCartsDao() 
            res.status(200).json(await carritos.save(data)) 
        } else {
            res.status(200).json('{error:-1,descripcion:"Usuario no registrado"}')
        }

        res.status(200).end()
    } catch(error) {
        res.status(200).json(`{error:-2,descripcion:${error.message}}`)
    } 
} 

 
//devuelve los productos del carrito  
const listarProductosCarrito = async (req, res) => { 
        try {
            const carritos = CartsFactory.getCartsDao()
            const searchId = req.params.id; //id carrito
            let prFind = await carritos.getById(searchId)
            if (prFind) { 
                res.status(200).json(prFind.products)
            } else { 
                res.status(200).json('{error:-1,descripcion:"carrito no encontrado"}') 
            }
 
            res.status(200).end()
        } catch(error) {
            res.status(200).json(`{error:-2,descripcion:"${error.message}"}`)
        } 
}

 

//elimina un carrito
const eliminarCarrito = async (req, res) => { 
        try {    
            const carritos = CartsFactory.getCartsDao()
            const searchId = req.params.id;
            //console.log("Delete id:",searchId);
            await carritos.deleteById(searchId) ;
                
            res.status(200).end()
        } catch(error) {
            res.status(200).json(`{error:-2,descripcion:"${error.message}"}`)
        } 
 
}

//elimina un producto del carrito
const eliminarProductoCarrito = async (req, res) => { 
        try {       
            const carritos = CartsFactory.getCartsDao()
            const searchId = req.params.id;
            const searchIdProd = req.params.id_prod; 

            await carritos.deleteByProd(searchId,searchIdProd) ;
                
            res.status(200).end()
        } catch(error) {
            res.status(200).json(`{error:-2,descripcion:"${error.message}"}`)
        } 
}


//recibe y agrega un producto, 
//al carrito
const agregarProductoCarrito = async (req, res) => { 
    try { 
     
        const { _id, qtyItem } = req.body

        const data = {
            _id: _id,
            qtyItem: qtyItem
        }

        //chequeo existencia producto
        const productos = ProductsFactory.getProductsDao()
        let prFind = await productos.getById(_id)
        if (prFind) { 
            const carritos = CartsFactory.getCartsDao()
            const searchId = req.params.id;
            res.status(200).json(await carritos.addProduct(searchId,data)); 

        } else { 
            res.status(200).json('{error:-1,descripcion:"producto no encontrado"}') 
        }
 
        res.status(200).end()
    } catch(error) {
        res.status(200).json(`{error:-2,descripcion:"${error.message}"}`)
    } 
     
}

export default {nuevoCarrito, listarProductosCarrito, eliminarCarrito, eliminarProductoCarrito, agregarProductoCarrito}
