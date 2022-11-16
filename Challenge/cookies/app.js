import express from 'express'
import cookieParser from 'cookie-parser'
import http from 'http'

const app = express()
const PORT = 3001

app.use(express.json())
app.use(cookieParser('3biXMV8#m5s7'))

app.post('/cookies',(req,res) => {
    const {key,value, expireDate} = req.body
    const opts={}

    if (!key || !value){
      return res.json({error:'falta nombre o valor'})
    }
   
    if (expireDate){
      opts.maxAge = parseInt(expireDate,10)
    }
   res.cookie(key,value,opts).json({proceso:'ok'})
})

 
app.get('/cookies', (req, res) => {
  res.json(req.cookies)
})

app.delete('/cookies/:key', (req, res) => {
  const {key} = req.params
  const cookie = req.cookies[key]
  res.clearCookie(key).json({proceso:'ok', target:{key,value:cookie}})
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running in port', PORT);
})