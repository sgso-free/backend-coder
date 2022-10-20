const {options} =  require('../options/mariaDB.js')
const knex = require('knex');


class Productos  {

  constructor () {  
  }

  async createTableProductos() {
      
    const knexInstance = knex(options)

    try {
        const exist = await knexInstance.schema.hasTable('productos')
        if(exist) {
          console.log('La tabla productos ya existe.')
          return
        }
        await knexInstance.schema.createTable('productos', (table) => {
          table.increments('id').notNullable()
          table.string('nombre', 15).notNullable()
          table.float('precio').notNullable()
          table.string('thumbnail', 50).notNullable()
          table.primary('id')
        })
        console.log('Tabla productos creada.')
      } catch (error) {
        console.error(error.message)
        throw error
      } finally {
        knexInstance.destroy()
      }
    }




    async  insertProducto(prod) { 

      const knexInstance = knex(options)

      try {
        await knexInstance('productos').insert(prod)
        console.log('Producto creado con exito')
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        knexInstance.destroy()
      }
    }
    
    async  getProductos() { 

      const knexInstance = knex(options)

      try {
        const result = await knexInstance('productos').select('*')
        let rows = JSON.parse(JSON.stringify(result));
        console.log('Productos encontrados:', rows)
        console.log('Productos encontrados:', rows.length)
        return rows
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        knexInstance.destroy()
      }
    }

}

module.exports = Productos;