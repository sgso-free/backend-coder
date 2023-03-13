import controller from '../controllers/ControllerMessage.js' 
import {Router} from 'express'  
const routerMensaje = Router(Router)
   

//recibe y agrega un mensaje, 
//y devuelve su id asignado.
routerMensaje.post('/', controller.nuevoMensaje)

routerMensaje.get('/:email', controller.listarMensajes)

export default routerMensaje