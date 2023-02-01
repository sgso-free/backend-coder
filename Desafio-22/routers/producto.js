
import controller from '../controllers/ControllerProducts.js' 
import {Router} from 'express'  
const routerProducto = Router(Router)
   

//recibe y agrega un producto, 
//y devuelve su id asignado.
routerProducto.post('/', controller.nuevoProducto)

//devuelve todos los productos
routerProducto.get('/', controller.listarProductos)

//formulario nuevo producto
routerProducto.get('/nuevoproducto', async(_,res)=>{
    controller.showFormNuevoProducto(_,res)
})

//devuelve un producto según su id.
routerProducto.get('/:id', async (req,res)=>{
    controller.listarProductoByID(req,res) 
})

//actualiza un producto
routerProducto.put('/:id',async(req,res)=>{
    controller.actualizarProductoByID(req,res) 
})

//elimina un producto
routerProducto.delete('/:id',async (req,res)=>{
    controller.eliminarProductoByID(req,res) 
})

export default routerProducto
