const Chapa = require('./chapaModel');
const Voto = require('./votosModel');
const Eleitor = require('./eleitorModel');
const setupAssociations = require('./associations');

// Configura as associações
setupAssociations();

module.exports = {
    Chapa,
    Voto,
    Eleitor
}; 