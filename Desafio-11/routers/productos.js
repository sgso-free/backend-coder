const express = require('express');
const router = express.Router();

const generar = require('../utils/generadores.js')

router.get('/productos-test', function(req, res, next) {
 
  try{
    const productArr = generar.generateProductTest(5)
    const data = {
      productos:productArr, 
      isEmpty:!productArr.length
    }
    console.log(data)
    res.render('productTest',data)
  } catch (error) {
     next(error)
  }

});

module.exports = router;