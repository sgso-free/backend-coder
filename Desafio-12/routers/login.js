 

const express = require('express') 
const session = require('express-session')
const MongoStore = require('connect-mongo')
    
const router = express.Router();

const USERNAME = "ejrp"
const PASSWORD = "pollito1234"

const auth = (req, res, next) => {
  const { isAuth } = req.session
  if (isAuth) {
    next()
  } else{
    res.status(403).send('No tienes permiso para estar acá!!!')
  }
}

router.post('/login', (req, res) => {
  console.log(JSON.stringify(req.body));
  const { username, password } = req.body
  if (username === USERNAME && password === PASSWORD) {
    req.session.username = username
    req.session.isAuth = true  

    const data = {
      username:username, 
    }
    res.render('index',data)
  
  } else {
    console.log(req.body)
    res.status(401).send('Username or password invalid!')
  }
})

router.post('/logout', (req, res) => {
  console.log("logout",JSON.stringify(req.body));
  req.session.destroy(error => {
    if (!error) {
      res.send('Adios')
    } else {
      res.send('Ah ocurrido un error', error.message)
    }
  })
})

router.get('/', (req, res) => {
  //const { username } = req.session
  res.render('login')
})

module.exports = router;
