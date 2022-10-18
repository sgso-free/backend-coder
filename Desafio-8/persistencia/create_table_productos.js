const {options} =  require('../options/mariaDB.js')
const knexInstance = require('knex')(options);

async function createTableProductos() {
     
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

  module.exports={createTableProductos}