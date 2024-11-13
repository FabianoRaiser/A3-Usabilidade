const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');

const Eleitor = sequelize.define('Eleitor', {
    ra: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    votou: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    hooks: {
        afterFind: (instances) => {
            if (Array.isArray(instances)) {
                // Para múltiplos registros (findAll)
                return instances.map(instance => {
                    const { ra, votou } = instance.toJSON();
                    return { ra, votou };
                });
            } else if (instances) {
                // Para um único registro (findOne, findByPk)
                const { ra, votou } = instances.toJSON();
                return { ra, votou };
            }
            return instances;
        },
        afterCreate: (instance) => {
            // Transforma a resposta após criar um novo eleitor
            const { ra, votou } = instance.toJSON();
            return { ra, votou };
        }
    }
});

module.exports = Eleitor;
