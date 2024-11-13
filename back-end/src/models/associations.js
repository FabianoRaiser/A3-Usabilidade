const Chapa = require('./chapaModel');
const Voto = require('./votosModel');
const Eleitor = require('./eleitorModel');

// Associações entre os modelos
const setupAssociations = () => {
    // Uma chapa pode ter muitos votos
    Chapa.hasMany(Voto, {
        foreignKey: 'chapaId'
    });

    // Um voto pertence a uma chapa
    Voto.belongsTo(Chapa, {
        foreignKey: 'chapaId'
    });
};

module.exports = setupAssociations; 