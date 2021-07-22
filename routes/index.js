var express = require('express');
var router = express.Router();

//Llamar a las queries
const api = require('../api');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});
/* ----------------------- Nosotros ------------------------- */
router.get('/about_me', (req, res) => {
  res.render('pages/about_me');
});
/* ------------------------productos ------------------------- */
router.get('/products', async (req, res) => {
  const wines = await api.getWines();
  res.render('pages/products', { wines });
});
/* ------------------------ Panel de administracion ------------------------- */
router.get('/products/list', async (req, res) => {
  const wines = await api.getWines();
  res.render('pages/productsList', { wines });
});
/* Agregar productos "GET" ------------------------- */
router.get('/agregar', (req, res) => {
  res.render('pages/agregar', { title: 'Agregar producto'});
});
/* ------------------------ Agregar productos "Post" ------------------------- */
router.post('/agregar', async (req, res) => {
  const {nombre, tipo, precio, url, variedad, descripcion, caracteristicas} = req.body
  await api.addWines(nombre, tipo, precio, url, variedad, descripcion, caracteristicas);
  res.redirect('/products/list');
});
/* Editar productos "GET" ------------------------- */
router.get('/editar/:id', async (req, res) => {
  //console.log(req.params.id);
  const wine = await api.getWineById(req.params.id);
  res.render('pages/editar', { title: 'Editar producto', wine });
});
/* ------------------------ Editar productos "Post" ------------------------- */
router.post('/editar/:id', async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const {nombre, tipo, precio, url, variedad, descripcion, caracteristicas} = req.body
  await api.updateWine(id,nombre, tipo, precio, url, variedad, descripcion, caracteristicas);
  res.redirect('/products/list');
});
/* Eliminar productos "GET" ------------------------- */
router.get('/eliminar/:id', async (req, res) => {
  //console.log(req.params.id);
  const affectedRows = await api.deleteWine(req.params.id);
  if (affectedRows > 0) {
    res.redirect('/products/list');
  }else{
    res.send('Algo salio en el proceso de eliminación');
  }
});

module.exports = router;
