const config = require('./config') 
const express = require('express')
const path = require('path')
const { parsed, error } = require("dotenv").config();
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

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
      console.log('Error in sign-in', error.message)
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

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

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

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.get('*', function(req, res){
  console.log("No autorizado ",req.query, JSON.stringify(req.body))
  res.status(404).json(`{error:-2,descripcion:"ruta ${req.baseUrl} metodo get no autorizada"}`);
})

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

module.exports = app;