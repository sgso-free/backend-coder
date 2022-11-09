import express from 'express'
import http from 'http'
import userRouter from './routes/usuarios.js'

const app = express()

const server = http.createServer(app)
app.use(express.json())
app.use('/api/usuarios',userRouter)

server.listen(3000,() =>{
        console.log("Servidor corriendo en http;//localhost:3000")

})