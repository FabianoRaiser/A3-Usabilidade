const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');

const Voto = sequelize.define('Voto', {
    chapaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Chapas',
            key: 'id'
        }
    },
    tipoVoto: {
        type: DataTypes.ENUM('normal', 'branco', 'nulo'),
        allowNull: false,
        defaultValue: 'normal'
    }
});

module.exports = Voto;
