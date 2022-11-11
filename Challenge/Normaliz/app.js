import { schema, normalize, denormalize } from 'normalizr'
import util from 'util' 

import fs from 'fs'


console.log('1-------------------------------------------------------------------');
 
const data = JSON.parse(fs.readFileSync('./message.json'))
 

console.log('2-------------------------------------------------------------------');

function print(object) {
  console.log(util.inspect(object, false, 14, true));
}

const authorSchema = new schema.Entity('author',{},{idAttribute: 'email'})

const mensajeSchema = new schema.Entity('mensaje', {
    author: authorSchema 
  })

  
const holdingSchema = new schema.Entity('socket', { 
  mensajes: [mensajeSchema]
})

console.log('3-------------------------------------------------------------------');

const originalSize = JSON.stringify(data).length

console.log('4-------------------------------------------------------------------');

console.log('Data Original', originalSize)

print(data)

console.log('5-------------------------------------------------------------------');

const dataNormalized = normalize(data, holdingSchema)

const normalizedSize = JSON.stringify(dataNormalized).length

console.log('Data Normalized', normalizedSize)

print(dataNormalized)

console.log('6-------------------------------------------------------------------');

const dataReversed = denormalize(dataNormalized.result, holdingSchema, dataNormalized.entities)

console.log('Data Reversed', JSON.stringify(dataReversed).length)

print(dataReversed)

console.log('7-------------------------------------------------------------------');

const result = (normalizedSize * 100) / originalSize

console.log('Porcentage de compresion:', result.toFixed(2), '%')