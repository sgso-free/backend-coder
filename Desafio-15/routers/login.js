 

const express = require('express') 
const session = require('express-session')
const passport = require('passport')

const router = express.Router();
 
const api = require('../daos/index.js');  
const users = api.UserDao;


const auth = (req, res, next) => {
 
  if (req.isAuthenticated()) {    
    //autorizado 
    next()
  } else{ 
    res.render('login') 
  }
}

router.post('/login', passport.authenticate('sign-in',{ 
  failureRedirect: "./" 
}), async (req, res) => {
    console.log("Login after auth",JSON.stringify(req.body));  
    res.redirect('./');   
})

router.post('/logout', (req, res) => {  
    let username = req.user.username
    req.logout(function(err) {
      if (err) { return next(err); } 
      res.render('logout',{username:username})
    });
    
})

router.get('/', auth,(req, res) => { 
  res.render('index',req.user)
})

router.get('/name', (req, res) => {   
  let name = req.user.username
  return res.status(200).send({name});
})


module.exports = router;
