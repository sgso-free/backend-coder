const express = require('express')
const path = require('path')
const { parsed, error } = require("dotenv").config();
const session = require('express-session')
const MongoStore = require('connect-mongo')
 
const loginRouter = require('./routers/login.js')

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
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://dbUser:BVxGLJxLZedM8Dzh@cluster0.qucq1d7.mongodb.net/sesiones?retryWrites=true&w=majority',
    mongoOptions: advancedOptions,
    ttl: 60,
  }),
  secret: '3biXMV8#m5s7',
  resave: true,
  saveUninitialized: true,
}))

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'hbs')
app.set('views', './views')
app.use('/api', loginRouter)

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