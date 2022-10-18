const path = require('path')
const options = {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '../DB/ecommerce.sqlite')  
    } ,
    useNullAsDefault: true
}

console.log(options)

module.exports = {
    options
}