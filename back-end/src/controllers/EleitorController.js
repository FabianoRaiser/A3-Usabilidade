const Controller = require('./Controller');
const { Eleitor } = require('../models');

class EleitorController extends Controller {
    constructor() {
        super(Eleitor);
    }

    // Método para criar múltiplos eleitores
    async createMany(req, res) {
        try {
            const { ras } = req.body;

            // Verifica se ras é um array e não está vazio
            if (!Array.isArray(ras) || ras.length === 0) {
                return res.status(400).json({ 
                    message: 'É necessário enviar um array de RAs' 
                });
            }

            // Formata os RAs para o formato esperado pelo bulkCreate
            const eleitores = ras.map(ra => ({ ra }));

            // Cria múltiplos eleitores
            const created = await this.model.bulkCreate(eleitores, {
                validate: true,
                returning: true
            });

            return res.status(201).json(created);
        } catch (error) {
            // Tratamento específico para erro de RA duplicado
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ 
                    message: 'Um ou mais RAs já estão cadastrados' 
                });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    // Método específico para verificar se eleitor já votou
    async verificarVoto(req, res) {
        try {
            const eleitor = await this.model.findOne({
                where: { ra: req.params.ra }
            });
            if (!eleitor) {
                return res.status(404).json({ message: 'Eleitor não encontrado' });
            }
            return res.status(200).json({ votou: eleitor.votou });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EleitorController();
