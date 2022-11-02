const mongoose = require("mongoose");
const config = require('../config.js')



class ContenedorMongoDB {
    constructor(modelName, schema) {
      //conect to mongo db  
      this.collection = mongoose.model(modelName, schema)
    }
 
   async connectDb () {
      await mongoose.connect(config.mongoDB.dbURI ).then(
          () => {
              console.info(`Connected to database`)
          },
          error => {
              console.error(`Connection error: ${error.stack}`)
              process.exit(1)
          }
      )
  }
   

    async getAll() {
      return this.collection.find({})
    }

    async save(obj) {
      const result = await this.collection.create(obj)
      return result
    }

    async getById (searchId) {
      try {

        return this.collection.find({id : searchId})

      } catch(error) {
          throw new Error(`An error when get object by id (in getbyId): ${error.message}`)
        
      }

  }

  async updateById (searchId,data) {
   
     this.collection.updateOne({id : searchId},data).then(function(){
          return searchId
      }).catch(function(error){
        throw new Error(`An error when get update by id (in updateById): ${error.message}`)
      });

  }


  async deleteById (searchId) {

      this.collection.deleteOne({id : searchId}).then(function(){
          return searchId
      }).catch(function(error){
        throw new Error(`An error when get remove by id (in deleteById): ${error.message}`)
      });
      

  }

  async deleteAll () {
      try { 
          this.elements = [] 
          return this.elements
      } catch(error) {
          throw new Error(`An error when get remove all (in deleteAll): ${error.message}`)
      }
  }
}

module.exports = ContenedorMongoDB