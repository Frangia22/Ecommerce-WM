const { response } = require('express');
const fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

//Llamar a las queries
const api = require('../api');

/* GET home page. */
router.get('/', async(req, res) => {
  const lastWines = await api.findLastWine();
  let logueado = req.session.loggedin;
  res.render('index',{ lastWines, logueado });
});
/* ----------------------- Nosotros ------------------------- */
router.get('/about_me', (req, res) => {
  let logueado = req.session.loggedin;
  res.render('pages/about_me',{ logueado });
});
/* ------------------------productos ------------------------- */
router.get('/products', async (req, res) => {
  let logueado = req.session.loggedin;
  const wines = await api.getWines();
  res.render('pages/products', { wines, logueado });
});
/* ------------------------productos filtro por categoria ------------------------- */
router.get('/products/categoriaUno', async (req, res) => {
  let logueado = req.session.loggedin;
  const wines = await api.filterUno();
  res.render('pages/products', { wines, logueado });
});
router.get('/products/categoriaDos', async (req, res) => {
  let logueado = req.session.loggedin;
  const wines = await api.filterDos();
  res.render('pages/products', { wines, logueado });
});
/* ------------------------productos ------------------------- */
router.get('/product', async (req, res) => {
  let logueado = req.session.loggedin;
  const wines = await api.getWines();
  const filterVariety = await api.getWineVariety();  
  /*const [ filterUno ] = [filterVariety];
  console.log(filterUno[0].DISTINCT);
  console.log(filterUno[1]);*/
  res.render('pages/products', { filterVariety, wines, logueado });
});
/* ------------------------Filtro con checkbox ------------------------- */
router.get('/filtrar', async (req, res) => {
  let logueado = req.session.loggedin;
  const wines = await api.getWines();
  const filterVariety = await api.getWineVariety();  
  console.log('Resultado', req.query.variedad);
  const wineFilters = req.query.variedad;
  res.render('pages/products', { 
    filterVariety, 
    wines, 
    wineFilters, 
    logueado 
  });
});
//Buscador
router.get('/buscar', async (req, res) => {
  let logueado = req.session.loggedin;
  // Los datos de la URL vienen en req.query
  const wines = await api.findWineByTitle(req.query.q);
  res.render('pages/products', {
    wines, 
    logueado
  });
  // res.send(book);
});
/* ------------------------Ver producto ------------------------- */
router.get('/product/:id', async (req, res) => {
  let logueado = req.session.loggedin;
  const wine = await api.getWineById(req.params.id);
  res.render('pages/product', { wine, logueado });
});

/* ------------------------ Panel de administracion ------------------------- */
router.get('/products/list', async (req, res) => {
  let logueado = req.session.loggedin;
  const wines = await api.getWines();
  if (logueado) {
    res.render('pages/productsList', { wines, message:'', logueado });
  } else {
    res.render('pages/login', { message: 'Por favor loguearse para ver esta pagina', logueado});
  }
});
/* Agregar productos "GET" ------------------------- */
router.get('/agregar', (req, res) => {
  let logueado = req.session.loggedin;
  res.render('pages/agregar', { title: 'Agregar producto', message: '', logueado});
});
/* ------------------------ Agregar productos "Post" ------------------------- */
router.post('/agregar', async (req, res) => {
  let logueado = req.session.loggedin;
  const {nombre, tipo, precio, url, variedad, descripcion, caracteristicas} = req.body
  await api.addWines(nombre, tipo, precio, url, variedad, descripcion, caracteristicas);
  const wines = await api.getWines();
  res.render('pages/productsList',{ message: 'Producto agregado correctamente', wines, logueado});
});
/* Editar productos "GET" ------------------------- */
router.get('/editar/:id', async (req, res) => {
  let logueado = req.session.loggedin;
  //console.log(req.params.id);
  const wine = await api.getWineById(req.params.id);
  res.render('pages/editar', { title: 'Editar producto', wine, logueado });
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
  let logueado = req.session.loggedin;
  //console.log(req.params.id);
  const wines = await api.getWines();
  const affectedRows = await api.deleteWine(req.params.id);
  if (affectedRows > 0) {
    res.render('pages/productsList', { message: 'Producto eliminado correctamente', wines, logueado });
  }else{
    res.send('Algo salio mal en el proceso de eliminación');
  }
});
/* ----------------------- Login ------------------------- */
router.get('/login', (req, res) => {
  let logueado = req.session.loggedin;
  res.render('pages/login', { message: '', logueado});
});
router.post('/loginPost', async (req, res) => {
  const usuario = await api.getUser(req.body.username, req.body.password);
  //Traeme el valor de session
  console.log('Login session =', req.session);
  let logueado;
  // Traeme los valores del Formulario
  const username = req.body.username;
  //console.log(usuario);
  const password = req.body.password;

  //Pregunto si los datos existen
  if (username && password) {
    if (usuario.length > 0) {
      req.session.loggedin = true;
      res.redirect('/products/list');    
    } else {
      res.render('pages/login', { message: 'El usuario o contraseña son incorrectos', logueado});
    }    
  }else {
    res.render('pages/login', { message: 'Por favor ingrese un usuario y una contraseña', logueado});
  }
});
router.get('/logout', async (req, res) => {
  const lastWines = await api.findLastWine();
  let logueado = false;
  req.session.destroy((err) => {});
  res.render('index', { lastWines ,logueado });  
});


module.exports = router;
