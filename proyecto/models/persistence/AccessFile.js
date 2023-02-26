import fs from 'fs'
import config from '../../config.js'

class AccessFile {
    
    constructor (pathName) { 
        this.pathName = `${config.fileSystem.path}/${pathName}`;        
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
            let dataRead = await this.getAll(); 

            //search the max id 
            let maxId = dataRead.reduce((idprev, obj2) => { 
                let result = (idprev < obj2.id) ? obj2.id : idprev; 
                return result;
            },0);
            
            //add 1 to the max id
            const newObj = { ...data , id : maxId+1}; 
            console.log(data)
            //add data to array
            dataRead.push(newObj)

           //convert data to json
            let jData =  JSON.stringify(dataRead)  

            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

            return  newObj
        } catch(error) {
            throw new Error(`An error ocurre when save to the file (in save): ${error.message}`)
        }
    }
 

    async getById (searchId) {
        try {

            //read all object, and finde the id
            let dataRead = await this.getAll(); 
            let elFind = dataRead.find((el) => el.id == searchId) 
            return elFind

        } catch(error) {
            throw new Error(`An error when get object by id (in getbyId): ${error.message}`)
          
        }

    }

    async updateById (searchId,data) {
        try {

            let dataRead = await this.getAll(); 

            //filter, remove the product with id
            let remainingArr = dataRead.filter((el) => el.id != searchId);  

            //add data to array
            remainingArr.push(data)

            //convert data to json
            let jData =  JSON.stringify(remainingArr)  

            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

            return  data.id 

        } catch(error) {
            throw new Error(`An error when update object by id (in updatebyId): ${error.message}`)
        }

    }
 
    
    async deleteById (searchId) {
        try {

            //read all object
            let dataRead = await this.getAll();
            
            //filter, remove the product with id
            let remainingArr = dataRead.filter((el) => el.id != searchId); 

            let jData =  JSON.stringify(remainingArr)  

            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

        } catch(error) {
            throw new Error(`An error when get remove by id (in deleteById): ${error.message}`)
         }


    }
 
    async deleteAll () {
        try {
            let jData =  JSON.stringify([])  
            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

        } catch(error) {
            throw new Error(`An error when get remove all (in deleteById): ${error.message}`)
         }
    }

    async deleteOneFromArray (searchId,arrayName,searchIdArray) {
        try {

            //read all object
            let dataRead = await this.getAll();
            let elFind = dataRead.find((el) => el.id == searchId) 
            
            //filter, remove the element with id
            let remainingArr = elFind[arrayName].filter((subEl) => subEl.id != searchIdArray); 

            elFind[arrayName] = remainingArr;
            
            //convert data to json
            let jData =  JSON.stringify(dataRead)  

            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

        } catch(error) {
            throw new Error(`An error when get remove element from array (in deleteOneFromArray): ${error.message}`) 
        }


    }

    async addOneInArray (searchId,arrayName,dataOne) {
        try {

            //read all object, and finde the id
            let dataRead = await this.getAll(); 
            let elFind = dataRead.find((el) => el.id == searchId) 
            
            console.log(elFind)
            console.log(elFind[arrayName])
            //filter, remove the element with id
            let remainingArr = elFind[arrayName].filter((el) => el.id != dataOne.id); 

            elFind[arrayName] = remainingArr;

            //add data to array
            elFind[arrayName].push(dataOne)
            
            //convert data to json
            let jData =  JSON.stringify(dataRead)  

            await fs.promises.writeFile(this.pathName,jData,'utf-8') 

        } catch(error) {
            throw new Error(`An error when add element in array (in addOneInArray): ${error.message}`)  
        } 
    }

};
 
export default AccessFile
 