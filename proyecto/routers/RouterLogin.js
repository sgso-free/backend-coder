 
import controller from '../controllers/controllerUserLogin.js' 
import {Router} from 'express'  
const routerLogin = Router(Router)   
 
import passport from 'passport'
 
const auth = (req, res, next) => {
 
  if (req.isAuthenticated()) {    
    //autorizado 
    next()
  } else{ 
    res.render('login') 
  }
}

routerLogin.post('/login', passport.authenticate('sign-in',{ 
  failureRedirect: "./" 
}), controller.loginUser)

routerLogin.post('/logout', controller.logoutUser)

routerLogin.get('/', auth,controller.dashboarUser)


export default routerLogin;
