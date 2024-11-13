const express = require('express');
const router = express.Router();
const chapaController = require('../controllers/ChapaController');

router
    .route('/chapas')
    .post(chapaController.create.bind(chapaController))
    .get(chapaController.findAll.bind(chapaController));

router
    .route('/chapas/:id')
    .get(chapaController.findOne.bind(chapaController))
    .put(chapaController.update.bind(chapaController))
    .delete(chapaController.delete.bind(chapaController));

router
    .route('/chapas/:id/votos')
    .get(chapaController.contarVotos.bind(chapaController));

module.exports = router; 