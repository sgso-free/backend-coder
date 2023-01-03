const config = require('./config') 
const express = require('express')
const fileUpload = require('express-fileupload');

const path = require('path')
const { parsed, error } = require("dotenv").config();
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const  minimist = require('minimist')
const cluster = require("cluster");
const os = require('os')
const compression = require('compression') 
const winston = require('winston')


const logger = winston.createLogger({
   level: 'info',
   transports : [
       new winston.transports.Console({level:'info'}),
       new winston.transports.File({ filename: 'warn.log', level:'warn' }),
       new winston.transports.File({ filename: 'error.log', level:'error' }),
   ]
})

const ENV = process.env.NODE_ENV

const opts = {
    default:{
      port: '8080',
      modo: 'FORK'
    },
    alias:{
      p: 'port',
      m: 'modo'
    }
}
const argv = minimist(process.argv.slice(2),opts);
console.log("Argumentos",argv);
console.log("PORT",argv['port']);
console.log("MODE",argv['modo']);

const PORT = argv['port']
const MODO = argv['modo']

if (MODO == 'CLUSTER' && cluster.isMaster) {
  const numbCPUS = os.cpus().length
  for (let i =0;i<numbCPUS;i++) {
    cluster.fork()
  }
  cluster.on('exit',(worker,code,signal)=>{
      console.log(`Worker killer: ${worker.process.pid} code ${code}`)
  })
} else {

  const api = require('./daos/index.js');  
  const users = api.UserDao;

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
  
  const loginRouter = require('./routers/login.js')
  const registerRouter = require('./routers/register.js')
  const infoRouter = require('./routers/info.js')
  const randomRouter = require('./routers/random.js') 
  const productosRouter = require('./routers/producto.js')
  const carritoRouter = require('./routers/carrito.js')

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
    secret: '3biXMV8#m5s7',
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
  app.use('/api/randoms', randomRouter)
  app.use('/info', infoRouter)
  app.use('/api/productos', productosRouter)
  app.use('/api/carrito', carritoRouter)

  app.use(function (err, req, res, next) {
    //console.error(err.stack)
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
 
  module.exports = app;
}