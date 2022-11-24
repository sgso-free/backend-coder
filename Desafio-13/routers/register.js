const express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {Router} = express


const routerRegister = Router(Router)
 
const api = require('../daos/index.js');  
const users = api.UserDao;

//recibe y agrega un usuario, 
//y devuelve su id asignado.
routerRegister.post('/', async (req,res)=>{ 
    console.log("Entro despues del button register")
    const { username, password } = req.body
    const data = {
        username:username,
        password:password
    }
    
    users.save(data) 
    res.render('index')
  
})
 
routerRegister.get('/', async (req,res)=>{ 
    res.render('register') 
})

module.exports = routerRegister
