const userAdmin = true;
const api = require('../daos/servicios.js');  
const productos = api.ProductosDao;

//recibe y agrega un producto, 
//y devuelve su id asignado.
const nuevoProducto = async (req, res) => { 
    if (userAdmin) {
        let { body : data } = req
        //res.status(200).json(await productos.save(data))
        
    } else {
        res.status(200).json('{error:-1,descripcion:"ruta /productos metodo post no autorizada"');
    }
     
}

//devuelve todos los productos
const listarProductos = async (_, res) => {  
    //res.status(200).json(await productos.getAll())
    let productArr = await productos.getAll()
    const data = {
        productos:productArr, 
        isEmpty:!productArr.length
      } 
    res.render('products',data)
}

//formulario nuevo producto
const showFormNuevoProducto = async (_, res) => {   
    if (userAdmin) {
        res.render('product')
    }
}

//devuelve un producto según su id.
const listarProductoByID = async (req, res) => {    
    const searchId = req.params.id;
    let prFind = await productos.getById(searchId)
    if (prFind) {
        //console.log('Here from router (Get)',prFind)
        res.send(prFind)
    } else {
        //console.log({ error : 'producto no encontrado' })
        res.send({ error : 'producto no encontrado' })
    }

    res.status(200).end()
}

//actualiza un producto
const actualizarProductoByID = async (req, res) => {   
    if (userAdmin) {
        const searchId = req.params.id;
        let { body : data } = req
        console.log(data)

        let prFind = await productos.updateById(searchId,data)
        if (prFind) {
            //console.log('Here from router (Get)',prFind)
            res.send(prFind)
        } else {
            //console.log({ error : 'producto no encontrado' })
            res.send({ error : 'producto no encontrado' })
        }
        res.status(200).end()

    } else {
        res.status(200).json('{error:-1,descripcion:"ruta /productos metodo put no autorizada"');
    }

}

//elimina un producto
const eliminarProductoByID = async (req, res) => {    
    if (userAdmin) {
        //const searchId = parseInt(req.params.id, 10);
        const searchId = req.params.id;
        //console.log("Delete id:",searchId);
        await productos.deleteById(searchId);
        res.status(200).end()

    } else {
        res.status(200).json('{error:-1,descripcion:"ruta /productos metodo delete no autorizada"');
    }
}