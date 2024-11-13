const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');

const Voto = sequelize.define('Voto', {
    chapaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Chapas',
            key: 'id'
        }
    }
});

module.exports = Voto;
