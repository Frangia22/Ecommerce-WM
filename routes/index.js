const { response } = require('express');
const fetch = require('node-fetch');
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
/* ------------------------productos filtro por categoria ------------------------- */
router.get('/products/categoriaUno', async (req, res) => {
  const wines = await api.filterUno();
  res.render('pages/products', { wines });
});
router.get('/products/categoriaDos', async (req, res) => {
  const wines = await api.filterDos();
  res.render('pages/products', { wines });
});
/* ------------------------productos ------------------------- */
router.get('/product', async (req, res) => {
  const wines = await api.getWines();
  const filterVariety = await api.getWineVariety();  
  /*const [ filterUno ] = [filterVariety];
  console.log(filterUno[0].DISTINCT);
  console.log(filterUno[1]);*/
  res.render('pages/products', { filterVariety, wines });
});
router.get('/filtrar', async (req, res) => {
  const wines = await api.getWines();
  const filterVariety = await api.getWineVariety();  
  console.log('Resultado', req.query.variedad);
  const wineFilters = req.query.variedad;
  res.render('pages/products', { 
    filterVariety, 
    wines, 
    wineFilters 
  });
});
//Buscador
router.get('/buscar', async (req, res) => {
  // Los datos de la URL vienen en req.query
  const wines = await api.findWineByTitle(req.query.q);
  res.render('pages/products', {
    wines
  });
  // res.send(book);
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
