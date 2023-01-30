var assert = require('assert');
const api = require('../daos/servicios.js');  
const productos = api.ProductosDao;
const axios =require('axios')

describe('Producto -> create', () => {
  
  it('Debe crear un producto de forma exitosa', async function ()  {

    let idCreate;
    axios.post('http://localhost:8081/api/productos', {
        nombre: 'NAME-001',
        descripcion: 'DESC-001',
        codigo: 'ABS100',
        foto: 'http://imagen4.js',
        precio: 100,
        stock: 5
    })
    .then((response) => {
        idCreate = response.data
        console.log('POST', response.data)
        // Expected output: "Success!"
      })
    .catch(console.error)

    let prFind = await productos.getById(idCreate)
    expect(prFind.nombre).to.be.eq('NAME-001')
    expect(result.lastname).to.be.eq('DESC-001')
    expect(result.codigo).to.be.eq('ABS100')
    expect(result.precio).to.be.a('int')
    expect(result.stock).to.be.a('int')

    
  })

})
