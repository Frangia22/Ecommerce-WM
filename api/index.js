// Llamo a Op para realizar queries complejas
const { Op } = require('sequelize');
//Importo los modelos
const db = require('../models');

// Le pido que me traiga todos los Productos
const getWines = async () => {
    const wines = await db.products.findAll()
        .then(result => {
            return result;
        });
    return wines;
};


module.exports = {
    getWines
}