const express = require('express');
const router = express.Router();
const chapaController = require('../controllers/ChapaController');

router
    .route('/chapas')
    .post(chapaController.create.bind(chapaController))
    .get(chapaController.findAll.bind(chapaController));

router
    .route('/chapas/:numero')
    .get(chapaController.findByNumero.bind(chapaController))
    .put(chapaController.update.bind(chapaController))
    .delete(chapaController.delete.bind(chapaController));

router
    .route('/chapas/:id/votos')
    .get(chapaController.contarVotos.bind(chapaController));

router
    .route('/chapas/votos/total')
    .get(chapaController.contarTodosVotos.bind(chapaController));

module.exports = router; 