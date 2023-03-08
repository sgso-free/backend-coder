import express from 'express' 
import fileUpload from 'express-fileupload' 
import  minimist from 'minimist'
import path from 'path' 
import * as dotenv from 'dotenv'
dotenv.config()

import session from 'express-session' 
import passport from 'passport' 
import {Strategy as LocalStrategy} from 'passport-local' 
import cluster from 'cluster'
import os from 'os' 
import compression from 'compression' 

import logger  from './logger.js' ;   

import loginRouter from './routers/RouterLogin.js' 
import registerRouter  from './routers/RouterRegister.js'  
import infoRouter from './routers/RouterInfo.js' 
//import randomRouter from './routers/random.js'   
import productosRouter from './routers/RouterProducts.js' 
import carritoRouter from './routers/RouterCarts.js' 

import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import UserFactory from './models/dao/users/User.factory.js' 
const users = UserFactory.getUserDao()

const ENV = process.env.NODE_ENV

const opts = {
    default:{
      port: '8080'
    },
    alias:{
      p: 'port'
    }
}
const argv = minimist(process.argv.slice(2),opts);
const PORT = argv['port']

passport.use('sign-in', new LocalStrategy({}, async(username, password, done) => {
  
    await users.getCheckUser(username,password)
      .then(user => {
        if (!user) { 
          done(null, false)
        } else {
          done(null, user)
        } 
      })
      .catch(error => {
        logger.log('error', `Error in sign-in ${error.message}`) 
        done(error)
      })
    
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((_id, done) => {
    users.getById(_id)
      .then(user => done(null, user))
      .catch(done)
  })
   
  const app = express()
   
  const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  // enable files upload
  app.use(fileUpload({
    createParentPath: true
  }));

  //app.use(compression())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  app.use(session({
    secret: process.env.SESION_SECRET,
    resave: true,
    saveUninitialized: true,
  }))

  app.use(express.static(path.join(__dirname, 'public')))
  app.use(passport.initialize());
  app.use(passport.session())
 
  app.set('view engine', 'hbs')
  app.set('views', './views')
  app.use('/api', loginRouter)
  app.use('/api/register', registerRouter)
  app.use('/info', infoRouter)
  app.use('/api/productos', productosRouter)
  app.use('/api/carrito', carritoRouter)

  app.use(function (err, req, res, next) {
    logger.log('error', `Error en servidor ${err.stack}`)
    res.status(500).send('Something broke!')
  })

  app.get('*', function(req, res){
    logger.log('warn', `Ruta ${req.baseUrl} no autorizada`) 
    //console.log("No autorizado ",req.query, JSON.stringify(req.body))
    res.status(404).json(`{error:-2,descripcion:"ruta ${req.baseUrl} metodo get no autorizada"}`);
  })

  const server = app.listen(PORT, () => {
    logger.log('info', `Servidor http esta escuchando en el puerto ${server.address().port} ${process.pid}`) 
    logger.log('info', `http://localhost:${server.address().port}`) 
    logger.log('info', `Environment:${ENV}`)  
  })

  server.on("error", error => logger.log('error', `Error en servidor ${error}`))
   