 

class ContenedorMemoria {
    
    constructor (pathName) {
        this.elements = [];    
        this.nextID = 1    
    }

    async getAll () {
        try {             
            return  [...this.elements]             
        } catch(error) {
            return []
        }
    }

    async save (data) {
        try {
  
            let newObj = { id: this.nextID, ...data }  
            this.elements.push(newObj)
            this.nextID++

            return  newObj
        } catch(error) {
            throw new Error(`An error ocurre when save to the file (in save): ${error.message}`)
        }
    }
 

    async getById (searchId) {
        try {
 
            let elFind = this.elements.find((el) => el.id == searchId) 
            return elFind

        } catch(error) {
            throw new Error(`An error when get object by id (in getbyId): ${error.message}`)
          
        }

    }

    async updateById (searchId,data) {
        try {
 
            //filter,  
            let index = this.elements.findIndex((el) => el.id != searchId);  
            if (index == -1) {
                throw new Error(`An error when update object: Object not find`)
            } else {
                this.elements[index]=data
                return data
            }

        } catch(error) {
            throw new Error(`An error when update object by id (in updatebyId): ${error.message}`)
        }

    }
 
    
    async deleteById (searchId) {
        try {
 
            //filter,  
            let index = this.elements.findIndex((el) => el.id != searchId);  
            if (index == -1) {
                throw new Error(`An error when remove object: Object not find`)
            } else {
               return this.elements.splice(index,1) 
            }
        } catch(error) {
            throw new Error(`An error when get remove by id (in deleteById): ${error.message}`)
         }


    }
 
    async deleteAll () {
        try { 
            this.elements = [] 
            return this.elements
        } catch(error) {
            throw new Error(`An error when get remove all (in deleteAll): ${error.message}`)
        }
    }


};
 
module.exports = ContenedorMemoria
 