import controller from '../controllers/ControllerCarts.js' 
import {Router} from 'express'  
const routerCarrito = Router(Router) 

const userAdmin = false;

//recibe y agrega un producto, 
//y devuelve su id asignado.
routerCarrito.post('/', controller.nuevoCarrito)

 
//devuelve los productos del carrito 
routerCarrito.get('/:id/productos', controller.listarProductosCarrito)

//elimina un carrito
routerCarrito.delete('/:id',controller.eliminarCarrito)

//elimina un producto del carrito
routerCarrito.delete('/:id/productos/:id_prod',controller.eliminarProductoCarrito)

//recibe y agrega un producto, 
//y devuelve su id asignado.
routerCarrito.post('/:id/productos', controller.agregarProductoCarrito)

export default routerCarrito
