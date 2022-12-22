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

        return this.collection.findOne({_id : searchId})

      } catch(error) {
          throw new Error(`An error when get object by id (in getbyId): ${error.message}`)
        
      }

  }

  async getByQuery (query) {
    try {

      return this.collection.find(query)

    } catch(error) {
        throw new Error(`An error when get object by id (in getByQuery): ${error.message}`)
      
    }

  }

  async getOneByQuery (query) {
    try {

        return this.collection.findOne(query)

    } catch(error) {
        throw new Error(`An error when get object by id (in getByQuery): ${error.message}`)
      
    }

  }

  async updateById (searchId,data) {
   
     this.collection.updateOne({_id : searchId},data).then(function(){
          return searchId
      }).catch(function(error){
        throw new Error(`An error when get update by id (in updateById): ${error.message}`)
      });

  }


  async deleteById (searchId) {

      this.collection.deleteOne({_id : searchId}).then(function(){
          return searchId
      }).catch(function(error){
        throw new Error(`An error when get remove by id (in deleteById): ${error.message}`)
      });
       
  }

  async deleteAll () {
    this.collection.deleteAll().then(function(){
      return []
    }).catch(function(error){
          throw new Error(`An error when get remove all (in deleteAll): ${error.message}`)
    });
  }


  async deleteOneFromArray (searchId,arrayName,searchIdArray) {
    
      this.collection.updateOne({_id : searchId}, {
          $pull: {
            [arrayName]: {_id: searchIdArray},
          },
      }).then(function(){
            return 
      }).catch(function(error){
        throw new Error(`An error when get remove one from array (in deleteOneFromArray): ${error.message}`)
      });
 
  }

  async addOneInArray (searchId,arrayName,dataOne) {
    try {
        //if exist update, without duplicate 
        let selArray = arrayName+".$"
        let idArray = arrayName+"._id"
        let result = await this.collection.updateOne({_id : searchId, [idArray]: {$ne: dataOne._id}},
          {$push: { [arrayName]: dataOne}} );
        if (result.modifiedCount==0) {
          let result2 = await this.collection.updateOne({_id : searchId, [arrayName]:{ "$elemMatch": {_id:dataOne._id}}}, {
            $set: {
              [selArray]: dataOne,
            }})
            console.log(result2)
        }
    } catch(error) {
      throw new Error(`An error when add one in array (in addOneInArray): ${error.message}`)
    }
  }


}

module.exports = ContenedorMongoDB