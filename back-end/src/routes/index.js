const express = require('express');
const router = express.Router();

// Importando rotas
const eleitorRoutes = require('./eleitorRoutes');
const chapaRoutes = require('./chapaRoutes');
const votoRoutes = require('./votoRoutes');

// Rota base
router.get('/', (req, res) => {
    res.json({ message: 'API UniVOTA funcionando!' });
});

// Usando as rotas sem prefixos
router.use(eleitorRoutes);
router.use(chapaRoutes);
router.use(votoRoutes);

module.exports = router; 