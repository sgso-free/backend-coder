import express from 'express'
import expressSession from 'express-session'
import http from 'http'

const app = express()
const PORT = 3001
const USERNAME = "ejrp"
const PASSWORD = "pollito1234"

const auth = (req,res,next)=> {
  const {isAuth} = req.session
  if (isAuth) {
    next()
  } else {
    res.status(403).send('No tiene permiso para estar aca!!!')
  }
}

app.use(express.json())
app.use(expressSession({
  secret:'3biXMV8#m5s7',
  resave:true,
  saveUninitialized:true,
}))

app.post('/login', (req, res) => {
  const {username,password} = req.body
  if(username===USERNAME && password===PASSWORD){
    req.session.username=username
    req.session.isAuth = true 
    res.status(200).send('Auth OK')
  } else { 
    res.status(401).send('Username or password invalid')
  }

})

//auth middleware
app.get('/private', auth,(req, res) => {
  const {username} = req.session 
  res.status(200).send(`Hola,  #${username}`)
})

app.get('/', (req, res) => {
  if(req.session.contador){
    req.session.contador+=1
    res.send(`Hola, esta es tu visita #${req.session.contador}`)
  } else {
    req.session.contador=1
    res.send('Bienvenido')
  }
 

})



app.delete('/logout', (req, res) => {
    req.session.destroy(error => {
      if (!error) {
        res.send('Adios')
      } else {
        res.send('A ocurrido un error',error.message)
      }
    })
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in port', PORT);
})