import controller from '../controllers/ControllerUSerRegister.js' 
import {Router} from 'express'  
const routerRegister = Router(Router)  
  
//recibe y agrega un usuario, 
//y devuelve su id asignado
routerRegister.post('/',  controller.nuevoUsuario)
 
routerRegister.get('/',  controller.dashboardUsuario)

export default  routerRegister
