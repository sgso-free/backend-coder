const userAdmin = true;
import UserFactory from '../models/dao/users/User.factory.js' 
const users = UserFactory.getUserDao()
   
import logger from '../logger.js';  
 
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
 
export default {loginUser, logoutUser, dashboarUser}
