 

class AccessMemory {
    
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
            let index = this.elements.findIndex((el) => el.id == searchId);  
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
            let index = this.elements.findIndex((el) => el.id == searchId);  
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

    async deleteOneFromArray (searchId,arrayName,searchIdArray) {
        try {

            //read all object
            let index = this.elements.findIndex((el) => el.id == searchId); 
            
            if (index == -1) {
                throw new Error(`An error when update object: Object not find`)
            } else {
                let elem = this.elements[index] 
                let indexArray = elem[arrayName].findIndex((el) => el.id == searchIdArray); 
                if (indexArray != -1) {
                    elem[arrayName].splice(indexArray,1) 
                }
            } 

        } catch(error) {
            throw new Error(`An error when get remove element from array (in deleteOneFromArray): ${error.message}`) 
        }


    }

    async addOneInArray (searchId,arrayName,dataOne) {
        try {

            //read all object
            let index = this.elements.findIndex((el) => el.id == searchId);  
            if (index == -1) {
                throw new Error(`An error when update object: Object not find`)
            } else {
                let elem = this.elements[index] 
                let indexEl = elem[arrayName].findIndex((el) => el.id == dataOne.id); 
                if (indexEl == -1) { 
                    elem[arrayName].push(dataOne)
                } else { 
                    elem[arrayName][indexEl]=dataOne
                } 
            }  

        } catch(error) {
            throw new Error(`An error when add element in array (in addOneInArray): ${error.message}`)  
        } 
    }


};
 
export default AccessMemory
 