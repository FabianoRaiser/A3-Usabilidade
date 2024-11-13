const express = require('express');
const router = express.Router();
const eleitorController = require('../controllers/eleitorController');

// Rota para criar múltiplos eleitores
router
    .route('/eleitores/batch')
    .post(eleitorController.createMany.bind(eleitorController));

router
    .route('/eleitores/verificar/:ra')
    .get(eleitorController.verificarVoto.bind(eleitorController));

router
    .route('/eleitores')
    .post(eleitorController.create.bind(eleitorController))
    .get(eleitorController.findAll.bind(eleitorController));

router
    .route('/eleitores/:id')
    .get(eleitorController.findOne.bind(eleitorController))
    .put(eleitorController.update.bind(eleitorController))
    .delete(eleitorController.delete.bind(eleitorController));

module.exports = router; 