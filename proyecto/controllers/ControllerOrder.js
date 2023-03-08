const userAdmin = true;
import OrderFactory from '../models/dao/order/Order.factory.js' 

 

//recibe y agrega un producto, 
//y devuelve su id asignado.
const nuevaOrden = async (req, res) => { 
    try {
        let { body : data } = req
        res.status(200).json(await orders.save(data)) 
    } catch(error) {
        res.status(200).json(`{error:-2,descripcion:${error.message}}`)
    } 
} 

 
//devuelve una orden
const listarOrden = async (req, res) => { 
        try {
            const orders = OrderFactory.getOrderDao()
            const searchId = req.params.id; //id order
            let prFind = await orders.getById(searchId)
            if (prFind) { 
                res.status(200).json(prFind)
            } else {
                //console.log({ error : 'order no encontrado' })
                res.send({ error : 'order no encontrado' })
            }

            res.status(200).end()

        } catch(error) {
            res.status(200).json(`{error:-2,descripcion:${error.message}}`)
        } 
}

    
export default {nuevaOrden,listarOrden}
