const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');

const Chapa = sequelize.define('Chapa', {
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true  // Permite que seja null caso não tenha imagem
    }
});

module.exports = Chapa;
