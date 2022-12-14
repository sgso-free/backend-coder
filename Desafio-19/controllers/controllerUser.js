const express = require('express') 
const session = require('express-session')
const passport = require('passport')
 
 
const api = require('../daos/servicios.js');  
const users = api.UserDao;

const logger = require('../logger.js');  
 
const auth = (req, res, next) => {
 
  if (req.isAuthenticated()) {    
    //autorizado 
    next()
  } else{ 
    res.render('login') 
  }
}

const loginUser = async (req, res) => {
    logger.log('info', `Login after auth: ${JSON.stringify(req.body)}`)  
    //console.log("Login after auth",JSON.stringify(req.body));  
    res.redirect('./');   
}

const logoutUser = async (req, res) => {  
    let username = req.user.username
    req.logout(function(err) {
      if (err) { return next(err); } 
      res.render('logout',{username:username})
    });
    
}

const dashboarUser = async (req, res) => { 
  res.render('index',req.user)
}
 
module.exports = {loginUser, logoutUser, dashboarUser}
