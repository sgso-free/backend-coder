const { faker } = require('@faker-js/faker');


    function generarProductFake() {
        return{
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            foto: faker.internet.avatar()
        }
    }

    function generateProductTest(cant = 5) {
        let products =[]
        for(let i=1;i<cant;i++){
            products.push(generarProductFake())
        }
        return products
    }

module.exports = {generateProductTest};