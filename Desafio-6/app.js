const express = require('express')
const path = require('path')
const { parsed, error } = require("dotenv").config();

//const {engine} = require('hbs')

var indexRouter = require('./routers/index');
//const productos = require('./routers/productos')

const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
 
app.set('view engine', 'hbs')
app.set('views', './views')

//app.use('/api', productos)
app.use('/', indexRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


module.exports = app;