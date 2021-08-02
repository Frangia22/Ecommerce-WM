// Llamo a Op para realizar queries complejas
const { sequelize, Op } = require('sequelize');
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
//Agregar un producto
const addWines = async (nombre, tipo, precio, url, variedad, descripcion, caracteristicas) => {
    const wine = await db.products.create({
        nombre,
        tipo,
        precio,
        url,
        variedad,
        descripcion,
        caracteristicas
    });
    return wine;
};
// Traer producto selecionado por a id 
const getWineById = async(id) => {
    const wine = await db.products.findByPk(id)
    .then(result => {
        return result;
    });
    return wine;
};
//Hacer un Update con los datos que me muestra
// Solucion error Missing parameter option where , para solucionarlo agrega todos los campos de la db que tenia que actualizar
const updateWine = async (id, nombre, tipo, precio, url, variedad, descripcion, caracteristicas) => {
    const wine = await db.products.update({nombre, tipo, precio, url, variedad, descripcion, caracteristicas}, {
        where: {
          id
        }
    });
    return wine;
};
// Eliminar producto
const deleteWine = async(idWine) => {
    const wine = await db.products.destroy({
        where: {
            id:idWine
        }
    });
    return wine;
}


// Filter queries  -----------------------------
const filterUno = async () => {
    const filterWine = await db.products.findAll({
        where: {
            tipo: "tinto"
        }
    })
    .then(result => {
        return result;
    });
    return filterWine;
}

const filterDos = async () => {
    const filterWine = await db.products.findAll({
        where: {
            tipo: "blanco"
        }
    })
    .then(result => {
        return result;
    });
    return filterWine;
}
//Traigo todas las variedades de vinos
const getWineVariety = async () => {
    // Select Distinct('variedad') from 'products'
    const wineVariety = await db.products.aggregate('variedad', 'DISTINCT', { plain: false 
    })
    .then(result => {
        return result;
    });
    return wineVariety;
}
//Buscador
const findWineByTitle = async (query) => {
    const wines = await db.products.findAll({
        where: {
            nombre: {
                [Op.substring]: query
            }
        }
    })
    .then(result => {
        return result;
    });
    return wines;
}
// Traer los ultimos 8 Productos
const findLastWine = async () => {
    const wines = await db.products.findAll({
        limit: 10,
        order:[
            ['id', 'DESC']
        ]
    });
    return wines;
}
//Traer usuario y pass
const getUser = async(username, password) => {
    const usuario = await db.users.findAll({
        where: {
                user: username,
                password: password          
        }
    })
    .then(result => {
        return result;
    })
    return usuario;
}

module.exports = {
    getWines,
    addWines,
    updateWine, 
    getWineById, 
    deleteWine,
    filterUno,
    filterDos,
    getWineVariety,
    findWineByTitle,
    findLastWine,
    getUser
}