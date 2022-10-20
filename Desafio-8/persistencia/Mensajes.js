const {options} =  require('../options/sqlite3')
const knex = require('knex') 

class Mensajes  {

  constructor () {  
  }

  async createTableMensajes() {
      
      const knexInstance = knex(options)

      try {
        const exist = await knexInstance.schema.hasTable('mensajes')
        if(exist) {
          console.log('La tabla mensajes ya existe.')
          return
        }
        await knexInstance.schema.createTable('mensajes', (table) => {
          table.increments('id').notNullable()
          table.string('email', 15).notNullable() 
          table.time('fecha').notNullable() 
          table.string('mensaje', 50).notNullable()
          table.string('socketID').notNullable()            
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


    async  insertMensaje(mensaj) { 

      const knexInstance = knex(options)

      try {
        await knexInstance('mensajes').insert(mensaj)
        console.log('Mensaje creado con exito')
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        knexInstance.destroy()
      }
    }
    
    async  getMensajes() { 

      const knexInstance = knex(options)

      try {
        const rows = await knexInstance('mensajes').select('*')
        console.log('Mensajes encontrados:', rows.length)
        return rows
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        knexInstance.destroy()
      }
    }

}

module.exports = Mensajes;