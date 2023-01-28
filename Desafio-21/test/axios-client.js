const axios =require('axios')

axios.get('http://localhost:8081/api/productos')
  .then(response => console.log('GET All Products', response.data))
  .catch(console.error)

axios.get('http://localhost:8081/api/productos/63d53d7469b9cbccbb61679d')
  .then(response => console.log('GET A Product', response.data))
  .catch(console.error)

axios.post('http://localhost:8081/api/productos', {
    nombre: 'Producto Nuevo 1',
    descripcion: 'Nuevo producto creado desde axios',
    codigo: 'ABS100',
    foto: 'http://imagen4.js',
    precio: 100,
    stock: 5
  })
  .then(response => console.log('POST', response.data))
  .catch(console.error)

  axios.put('http://localhost:8081/api/productos/63d53dbf5630b3eba8ec6b17', {
    nombre: 'Producto Cambio 1',
    descripcion: 'Cambio producto creado desde axios',
    codigo: 'ABS100',
    foto: 'http://imagen4.js',
    precio: 200,
    stock: 10
  })
  .then(response => console.log('PUT', response.data))
  .catch(console.error)

  axios.delete('http://localhost:8081/api/productos/63d53dbf5630b3eba8ec6b17')
  .then(response => console.log('DELETE', response.data))
  .catch(console.error)