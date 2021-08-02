module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define( 'users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: DataTypes.STRING(60),
        password: DataTypes.STRING(100),
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    return Users;
};