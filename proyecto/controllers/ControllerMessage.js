const userAdmin = true;
import MessageFactory from '../models/dao/messages/Message.factory.js' 
import UserFactory from '../models/dao/users/User.factory.js'  

//recibe y agrega un producto, 
//y devuelve su id asignado.
const nuevoMensaje = async (req, res) => { 
    try {
        
        const { email, mensaje } = req.body
      
        const data = {
            email:email,
            cuerpo: mensaje,
            tipo:'usuario'
        }
 
        //chequear el usuario
        const users = UserFactory.getUserDao() 
        const usersFind = await users.getByUserName(email) 

        if (usersFind) { 
            //creo mensaje
            const mensajes = MessageFactory.getMessageDao() 
            res.status(200).json(await mensajes.save(data)) 
        } else {
            res.status(200).json('{error:-1,descripcion:"Usuario no registrado"}')
        }

        res.status(200).end()
    } catch(error) {
        res.status(200).json(`{error:-2,descripcion:${error.message}}`)
    } 
} 

 
//devuelve los mensajes por usuario 
const listarMensajes = async (req, res) => { 
        try {
            const mensajes = MessageFactory.getMessageDao()
            const searchEmail = req.params.email; //id carrito
            let prFind = await mensajes.getByUserName(searchEmail)
            if (prFind) { 
                res.status(200).json(prFind)
            } else { 
                res.status(200).json('{error:-1,descripcion:"no hay mensajes"}') 
            }
 
            res.status(200).end()
        } catch(error) {
            res.status(200).json(`{error:-2,descripcion:"${error.message}"}`)
        } 
}

 

export default {nuevoMensaje, listarMensajes}
