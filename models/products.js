module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define( 'products', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: DataTypes.STRING(40),
        tipo: DataTypes.STRING(100),
        precio: DataTypes.INTEGER,
        url: DataTypes.STRING(150),
        variedad: DataTypes.STRING(100),
        descripcion: DataTypes.STRING(200)
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    return Products;
};