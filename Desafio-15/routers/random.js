const express = require('express') 

const {Router} = express


const routerRandom = Router(Router)
 
const api = require('../daos/index.js');  
const users = api.UserDao;



function getRandomNum (min,max) {
    return Math.ceil(Math.random()*(max - min)+min);
}

function generateRandomNum (cant){

    let min = 1;
    let max = 1000; 
    let arrayRandom = [max];
    //Init
    for(let i=1; i<max;i++) {
        arrayRandom[i]=0
        console.log(arrayRandom[i])
    }
    //Generated Random
    for(let i=0; i<cant;i++) {
        r = getRandomNum(min,max) 
        arrayRandom[r]++
        console.log(r," - ",arrayRandom[r])
    }
    return arrayRandom
}
 
routerRandom.get('/', async (req,res)=>{ 


    let cant = parseInt(req.query.cant) ?  parseInt(req.query.cant) : 100000000
    let arrayRandom = generateRandomNum(cant)
    //Return the articles to the rendering engine
    res.render('random', {
        array: arrayRandom
    });
 
})

module.exports = routerRandom
