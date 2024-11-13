const Controller = require('./Controller');
const { Voto, Eleitor } = require('../models');
const sequelize = require('../config/dbConnect');

class VotoController extends Controller {
    constructor() {
        super(Voto);
    }

    // Sobrescreve o método create para incluir a lógica de votação
    async create(req, res) {
        const t = await sequelize.transaction();

        try {
            const { ra, chapaId } = req.body;

            // Verifica se o eleitor existe e não votou
            const eleitor = await Eleitor.findOne({ 
                where: { ra, votou: false },
                transaction: t
            });

            if (!eleitor) {
                await t.rollback();
                return res.status(400).json({ 
                    message: 'Eleitor não encontrado ou já votou' 
                });
            }

            // Registra o voto
            const voto = await this.model.create({ 
                chapaId 
            }, { transaction: t });

            // Atualiza o status do eleitor
            await eleitor.update({ votou: true }, { transaction: t });

            await t.commit();
            return res.status(201).json({ message: 'Voto registrado com sucesso' });
        } catch (error) {
            await t.rollback();
            return res.status(500).json({ error: error.message });
        }
    }

    // Sobrescreve métodos que não devem ser acessíveis
    async update(req, res) {
        return res.status(403).json({ message: 'Operação não permitida' });
    }

    async delete(req, res) {
        return res.status(403).json({ message: 'Operação não permitida' });
    }
}

module.exports = new VotoController(); 