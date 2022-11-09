
import {faker} from '@faker-js/faker/locale/es_MX'
import {writeFile} from 'fs/promises'

const {name,internet,color} =faker

let data = 'Nombre:Apellido,Correo;Trabajo;Color\n'

for (let index=0;index<100;index++){
    data +=`${name.firstName()};${name.lastName()};${internet.email()};${name.jobTitle()};${color.human()}\n`
}

try{
    await writeFile('./test.csv',data)
} catch (error){
        console.log('Ocurrio un error:', error.message)
}