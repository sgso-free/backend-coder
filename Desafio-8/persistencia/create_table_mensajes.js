const {options} =  require('../options/sqlite3')
const knexInstance = require('knex')(options);

async function createTableMensajes() {
     
    try {
      const exist = await knexInstance.schema.hasTable('mensajes')
      if(exist) {
        console.log('La tabla mensajes ya existe.')
        return
      }
      await knexInstance.schema.createTable('mensajes', (table) => {
        table.increments('id').notNullable()
        table.string('email', 15).notNullable() 
        table.float('socketID').notNullable() 
        table.time('fecha').notNullable() 
        table.string('message', 50).notNullable()
        table.primary('id')
      })
      console.log('Tabla mensajes creada.')
    } catch (error) {
      console.error(error.message)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }


  module.exports = {createTableMensajes};