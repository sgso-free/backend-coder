const Contenedor = require('./Contenedor.js')

const oneproduct={
    title:'Producto 1',
    price:50,
    thimbnail:'http:\\dominio.com\imagen1.jpg'
};

const secproduct={
    title:'Producto 2',
    price:45,
    thimbnail:'http:\\dominio.com\imagen2.jpg'
};

const thirdproduct={
    title:'Producto 3',
    price:70,
    thimbnail:'http:\\dominio.com\imagen3.jpg'
};


async function test(){
    try{

        console.log('Init');
        const cont1 = new Contenedor("./products.json");
        
        /*await cont1.deleteAll()
        console.log('All product deleted');

        await cont1.save(oneproduct)
        console.log("One product added")

        await cont1.save(secproduct)
        console.log("Second product added")

        await cont1.save(thirdproduct)
        console.log("Third product added")*/

        //let pr=  await cont1.getById(2)
        //console.log("Get product",pr)

        let prs1 =  await cont1.getAll();
        console.log("All products",prs1)

        //await cont1.deleteById(2)
        //console.log("Deleted product with id =2")

        let prs2 =  await cont1.getAll();
        console.log("All products after deleted",prs2)

        let prs3 =  await cont1.getByRandom();
        console.log("All products after get random",prs3)

    }

    catch(error){
	    console.log('An error ocurre when test the app',error);
    }
}
/*
const express = require('express')

const app = express()
const PORT = 8080

const productos = new Contenedor("products.json")

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send({ mensaje: 'hola mundo' })
 })
 

 app.get('/productos',(req,res)=>{
    console.log("Get All Product") 
    res.send(productos.getAll())
  })
  app.get('/productoRandom',(req,res)=>{
       res.send("Hola") 
       res.send(productos.getByIdRandom())
  })
  server.on("Error",()=>{
      console.log('Error')
  })
*/
test();