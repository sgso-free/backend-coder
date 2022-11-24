 

const express = require('express') 
const session = require('express-session')
const MongoStore = require('connect-mongo')
    
const router = express.Router();

const USERNAME = "ejrp"
const PASSWORD = "pollito1234"

const auth = (req, res, next) => {

  const { isAuth } = req.session
  console.log(req.session)
  if (isAuth) {    
    console.log("por aqui voy a autorizado")
    next()
  } else{
    console.log("por aqui voy a loguin")
    res.render('login')
    //res.status(403).send('No tienes permiso para estar acá!!!')
  }
}

router.post('/login', (req, res) => {
  console.log(JSON.stringify(req.body));
  const { username, password } = req.body
  if (username === USERNAME && password === PASSWORD) {
    req.session.username = username
    req.session.isAuth = true  

    req.session.save(err => {
      if(err){
        res.send('Ah ocurrido un error', error.message)
      } else {
         res.redirect('./');
      }
    }); //THIS SAVES THE SESSION.
 
  } else {
    console.log(req.body)
    res.status(401).send('Username or password invalid!')
  }
})

router.post('/logout', (req, res) => {  
  const { username } = req.session
  const data = {
      username:username, 
  }
  req.session.destroy(error => {
    if (!error) {
      res.render('logout',data)
    } else {
      res.send('Ah ocurrido un error', error.message)
    }
  })
})

router.get('/', auth,(req, res) => {

  const data = {
    username:req.session.username, 
  }

  res.render('index',data)
})

router.get('/name', (req, res) => {
  let name;

  if (!req.session) {
      return res.status(404).send();
  }

  name = req.session.username;

  return res.status(200).send({name});
})


module.exports = router;
