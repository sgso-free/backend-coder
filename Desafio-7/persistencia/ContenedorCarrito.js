const fs = require('fs')

class ContenedorCarrito {
    
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
            let carritoRead = await this.getAll(); 

            //search the max id
            let maxId = carritoRead.reduce((pr1, pr2) => { 
                let result = (pr1 < pr2.id) ? pr2.id : pr1; 
                return result;
            },0);

            //add 1 to the max id
            data.id = maxId+1;
            data.timestamp = Date.now();
            data.productos =[];
            console.log(data)
            //add data to array
            carritoRead.push(data)

           //convert data to json
            let jData =  JSON.stringify(carritoRead)  

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
            let carritoRead = await this.getAll(); 
            let ctFind = carritoRead.find((ct) => ct.id == searchId) 
            return ctFind

        } catch(error) {
            console.log('An error when get object by id (in getbyId): ',error.message)
            //throw new Error(error.message)
            return null
        }

    }

    async updateById (searchId,data) {
        try {

            let carritoRead = await this.getAll(); 

            //filter, remove the product with id
            let remainingArr = carritoRead.filter((ct) => ct.id != searchId);  

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
            let carritoRead = await this.getAll();
            
            //filter, remove the product with id
            let remainingArr = carritoRead.filter((ct) => ct.id != searchId); 

            let jData =  JSON.stringify(remainingArr)  

            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

        } catch(error) {
            console.log('An error when get remove by id (in deleteById): ',error.message)
            //throw new Error(error.message)
        }


    }

    async deleteByProd (searchId,searchIdProd) {
        try {

            //read all object, and finde the id
            let carritoRead = await this.getAll(); 
            let ctFind = carritoRead.find((ct) => ct.id == searchId) 
            
            //filter, remove the product with id
            let remainingArr = ctFind.productos.filter((prod) => prod.id != searchIdProd); 

            ctFind.productos = remainingArr;
            
            //convert data to json
            let jData =  JSON.stringify(carritoRead)  

            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

        } catch(error) {
            console.log('An error when get remove product by id (in deleteByProd): ',error.message)
            //throw new Error(error.message)
        }


    }

    async addProduct (searchId,productData) {
        try {

            //read all object, and finde the id
            let carritoRead = await this.getAll(); 
            let ctFind = carritoRead.find((ct) => ct.id == searchId) 
            
            //filter, remove the product with id
            let remainingArr = ctFind.productos.filter((prod) => prod.id != productData.id); 

            ctFind.productos = remainingArr;

            //add data to array
            ctFind.productos.push(productData)
            
            //convert data to json
            let jData =  JSON.stringify(carritoRead)  

            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

        } catch(error) {
            console.log('An error when get remove product by id (in addProd): ',error.message)
            //throw new Error(error.message)
        }


    }


};
 
module.exports = ContenedorCarrito
 