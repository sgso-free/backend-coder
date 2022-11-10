const express = require('express');
const router = express.Router();

const generar = require('../utils/generadores.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/productos-test', function(req, res, next) {
  try{
    res.json(generar.generateProductTest(5))
  } catch(error) {
      next(error)
  }
});

module.exports = router;