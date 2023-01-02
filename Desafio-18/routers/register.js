const express = require('express');  
const sendMail = require('../mail.js')

const {Router} = express


const routerRegister = Router(Router)
 
const api = require('../daos/index.js');  
const users = api.UserDao;

//recibe y agrega un usuario, 
//y devuelve su id asignado
routerRegister.post('/', async (req,res)=>{  
    const { username, password, name, age, address, phone } = req.body
     
    const data = {
        username:username,
        password:password,
        name: name,
        age: age,
        address:address,
        phone:phone
    }
    
    const usersFind = await users.getByUserName(username) 

    if (usersFind) { 
        res.render('error',{message: 'Usuario ya registrado.'})
    } else {

        try {
              await users.save(data) 
              const sm = new sendMail()
              sm.senMail("Nuevo Registro",JSON.stringify(data))
      
              res.render('login') 

          } catch (error) {
              //return next(error);
              data.message = error.message
              res.render('register',data)
          }

    }
    
})
 
routerRegister.get('/', async (req,res)=>{ 
    res.render('register') 
})

module.exports = routerRegister
