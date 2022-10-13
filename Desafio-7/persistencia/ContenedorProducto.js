const fs = require('fs')

class ContenedorProducto {
    
    constructor (pathName) {
        this.pathName = pathName 
        
    }

    async getAll () {
        try { 
            let jsonString = await fs.promises.readFile(this.pathName,'utf-8')
            //convert json to array of object
            return JSON.parse(jsonString,'utf-8')               
        } catch(error) {
            return []
        }
    }

    async save (data) {
        try {

            //read all object
            let productsRead = await this.getAll(); 

            //search the max id
            let maxId = productsRead.reduce((pr1, pr2) => { 
                let result = (pr1 < pr2.id) ? pr2.id : pr1; 
                return result;
            },0);

            //add 1 to the max id
            data.id = maxId+1;
            data.timestamp = Date.now();
            console.log(data)
            //add data to array
            productsRead.push(data)

           //convert data to json
            let jData =  JSON.stringify(productsRead)  

            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

            return  data.id
        } catch(error) {
            console.log('An error ocurre when save product to the file (in save): ',error.message)
            return 0;
            //throw new Error(error.message)
        }
    }
 

    async getById (searchId) {
        try {

            //read all object, and finde the id
            let productsRead = await this.getAll(); 
            let prFind = productsRead.find((pr) => pr.id == searchId) 
            return prFind

        } catch(error) {
            console.log('An error when get object by id (in getbyId): ',error.message)
            //throw new Error(error.message)
            return null
        }

    }

    async updateById (searchId,data) {
        try {

            let productsRead = await this.getAll(); 

            //filter, remove the product with id
            let remainingArr = productsRead.filter((pr) => pr.id != searchId);  

            //add data to array
            remainingArr.push(data)

            //convert data to json
            let jData =  JSON.stringify(remainingArr)  

            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

            return  data.id 

        } catch(error) {
            console.log('An error when get object by id (in getbyId): ',error.message)
            //throw new Error(error.message)
            return null
        }

    }
 
    
    async deleteById (searchId) {
        try {

            //read all object
            let productsRead = await this.getAll();
            
            //filter, remove the product with id
            let remainingArr = productsRead.filter((pr) => pr.id != searchId); 

            let jData =  JSON.stringify(remainingArr)  

            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

        } catch(error) {
            console.log('An error when get remove by id (in deleteById): ',error.message)
            //throw new Error(error.message)
        }


    }

};
 
module.exports = ContenedorProducto
 