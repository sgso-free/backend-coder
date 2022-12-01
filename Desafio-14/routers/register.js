const express = require('express') 

const {Router} = express


const routerRegister = Router(Router)
 
const api = require('../daos/index.js');  
const users = api.UserDao;

//recibe y agrega un usuario, 
//y devuelve su id asignado.
routerRegister.post('/', async (req,res)=>{  
    const { username, password } = req.body
    const data = {
        username:username,
        password:password
    }
    
    const usersFind = await users.getByUserName(username) 

    if (usersFind) { 
        res.render('error',{message: 'Usuario ya registrado.'})
    } else {
        users.save(data) 
        res.render('login') 
    }

    
  
})
 
routerRegister.get('/', async (req,res)=>{ 
    res.render('register') 
})

module.exports = routerRegister
