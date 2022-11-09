import express from 'express'
import http from 'http'
import {faker} from '@faker-js/faker/locale/es_MX'

const {name,internet,color} = faker
const app = express()

const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

function random(min,max) {
    return Math.floor((Math.random()*(max-min+1))+ min)
}
function getRandomUserManual(){
    return{
        nombre:nombres[random(0,4)],
        apellido:apellidos[random(0,4)],
        color:colores[random(0,4)]
    }
}

function getRandomUserFaker(){
    return{
        nombre:name.firstName(),
        apellido:name.lastName(),
        color:color.human()
    }
}

const server = http.createServer(app)
app.get('/test', (req,res) => {
    console.log(req.query)
    const { cant = 10} = req.query
    const data =[]
    for (let index=0;index<parseInt(cant);index++){
        data.push(getRandomUserFaker())
    }
    res.json(data)
})

server.listen(3000,() =>{
        console.log("Servidor corriendo en http;//localhost:3000")

})