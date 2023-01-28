
const uuid = require('uuid');

  
class ContenedorFirebase {
    constructor(collectionName, firebaseAdmin) {
        this.firebase = firebaseAdmin
        this.collectionName = collectionName;
    }
    
    async getAll() {
        const db = this.firebase.firestore()
        const query = db.collection(this.collectionName)
        const querySnapshot = await query.get()
        let docs = querySnapshot.docs
        const data = docs.map(doc => ({ id: doc.id, ...doc.data() }))
        return data
    }

    async save(obj) {

        const db = this.firebase.firestore()
        const query = db.collection( this.collectionName)
        let id = uuid.v4();
        let doc = query.doc(id)
        const result = await doc.create(obj)
 
        return result
    }

    async getById (searchId) {
      try {
 
            const db = this.firebase.firestore()
            const query = db.collection( this.collectionName)
            const doc = query.doc(searchId)
            const item = await doc.get()
            
            return item.data()
       

      } catch(error) {
          throw new Error(`An error when get object by id (in getbyId): ${error.message}`)
        
      }

  }

  async updateById (searchId,data) {
   

    try {
        const db = this.firebase.firestore()
        const query = db.collection( this.collectionName)
        const doc = query.doc(searchId)
        await doc.update(data) 
        console.log(data,searchId)
        return searchId
      } catch (error) { 
        throw new Error(`An error when get update by id (in updateById): ${error.message}`)
      }

  }


  async deleteById (searchId) {

    try {
        const db = this.firebase.firestore()
        const query = db.collection( this.collectionName)
        console.log(searchId)
        const doc = query.doc(searchId)
        await doc.delete()
        return searchId
    } catch (error) {
        throw new Error(`An error when get remove by id (in deleteById): ${error.message}`)
    }
      

  }

  async deleteAll () {
    const db = this.firebase.firestore()
    const query = db.collection( this.collectionName)

    deleteQueryBatch(db, query).then(function(){
        return []
      }).catch(function(error){
            throw new Error(`An error when get remove all (in deleteAll): ${error.message}`)
      });

  }


  async deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();
  
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }
  
    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }

}

module.exports = ContenedorFirebase