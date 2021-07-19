var express = require('express');
var router = express.Router();

//Llamar a las queries
const api = require('../api');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});
router.get('/about_me', (req, res) => {
  res.render('pages/about_me');
});
router.get('/products', async (req, res) => {
  const wines = await api.getWines();
  res.render('pages/products', { wines });
});

module.exports = router;
