const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/dbConnect');

// Importa os modelos e associações
require('./models');

const app = express();
const port = process.env.PORT || 3000;

// Sincroniza os modelos com o banco de dados
sequelize.sync({ force: false })
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
