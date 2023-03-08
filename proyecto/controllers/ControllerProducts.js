const userAdmin = true;
import ProductsFactory from '../models/dao/products/Products.factory.js' 


//recibe y agrega un producto, 
//y devuelve su id asignado.
const nuevoProducto = async (req, res) => { 
    try {
        const productos = ProductsFactory.getProductsDao()
        if (userAdmin) {
            let { body : data } = req
            res.status(200).json(await productos.save(data))
            
        } else {
            res.status(200).json('{error:-1,descripcion:"ruta /productos metodo post no autorizada"');
        }
    } catch(error) {
        res.status(200).json(`{error:-2,descripcion:${error.message}}`)
    }  
}

//devuelve todos los productos
const listarProductos = async (_, res) => {  
    const productos = ProductsFactory.getProductsDao()
    res.status(200).json(await productos.getAll())
    //let productArr = await productos.getAll()
    /*const data = {
        productos:productArr, 
        isEmpty:!productArr.length
      } 
    res.render('products',data)*/
}
 
//devuelve un producto según su id.
const listarProductoByID = async (req, res) => {    

    try {
        const searchId = req.params.id;
        let prFind = await productos.getById(searchId)
        if (prFind) {
            //console.log('Here from router (Get)',prFind)
            res.send(prFind)
        } else {
            //console.log({ error : 'producto no encontrado' })
            res.send({error:-3,descripcion:'producto no encontrado' })
        }
    } catch(error) {
        res.send({error:-2,descripcion:`${error.message}`})
    }

    res.status(200).end()


}

//actualiza un producto
const actualizarProductoByID = async (req, res) => {   
    try{
        const productos = ProductsFactory.getProductsDao()

        if (userAdmin) {
            const searchId = req.params.id;
            let { body : data } = req
            console.log(data)
    
            let prFind = await productos.updateById(searchId,data)
            if (prFind.matchedCount>0) {
                //console.log('Here from router (Get)',prFind)
                res.send({descripcion:'producto actualizado'})
            } else {
                //console.log({ error : 'producto no encontrado' })
                res.send({error:-3,descripcion:'producto no encontrado' })
            }
            res.status(200).end()
    
        } else {
            res.status(200).json('{error:-1,descripcion:"ruta /productos metodo put no autorizada"');
        }

    } catch(error) {
        res.status(200).json(`{error:-2,descripcion:${error.message}}`)
    }
    

}

//elimina un producto
const eliminarProductoByID = async (req, res) => {    
    try {

        if (userAdmin) {
            const productos = ProductsFactory.getProductsDao()
            //const searchId = parseInt(req.params.id, 10);
            const searchId = req.params.id;
            //console.log("Delete id:",searchId);
            await productos.deleteById(searchId);
            res.status(200).end()
    
        } else {
            res.status(200).json('{error:-1,descripcion:"ruta /productos metodo delete no autorizada"');
        }
    } catch(error) {
        res.status(200).json(`{error:-2,descripcion:${error.message}}`)
    }
   
}

export default {nuevoProducto, listarProductos,listarProductoByID,actualizarProductoByID,eliminarProductoByID}