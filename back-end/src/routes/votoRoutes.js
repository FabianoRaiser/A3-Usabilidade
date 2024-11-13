const express = require('express');
const router = express.Router();
const votoController = require('../controllers/VotoController');

router
    .route('/votos')
    .post(votoController.create.bind(votoController))
    .get(votoController.findAll.bind(votoController));

module.exports = router; 