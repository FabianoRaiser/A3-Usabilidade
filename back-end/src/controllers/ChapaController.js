const Controller = require('./Controller');
const { Chapa, Voto } = require('../models');
const sequelize = require('sequelize');

class ChapaController extends Controller {
    constructor() {
        super(Chapa);
    }

    // Método para buscar chapa pelo número
    async findByNumero(req, res) {
        try {
            const numero = parseInt(req.params.numero);
            
            if (isNaN(numero)) {
                return res.status(400).json({ message: 'Número da chapa inválido' });
            }

            const chapa = await this.model.findOne({
                where: { numero }
            });
            
            if (!chapa) {
                return res.status(404).json({ message: 'Chapa não encontrada' });
            }

            return res.status(200).json(chapa);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Método específico para contar votos da chapa
    async contarVotos(req, res) {
        try {
            const votos = await Voto.count({
                where: { chapaId: req.params.id }
            });
            return res.status(200).json({ votos });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async contarTodosVotos(req, res) {
        try {
            // Conta votos por chapa
            const chapas = await this.model.findAll({
                attributes: [
                    'numero',
                    'nome',
                    [sequelize.fn('COUNT', sequelize.col('votos.id')), 'total_votos']
                ],
                include: [{
                    model: Voto,
                    attributes: [],
                    where: { tipoVoto: 'normal' }
                }],
                group: ['Chapa.id'],
                raw: true
            });

            // Conta votos brancos e nulos
            const [votosBrancos] = await Voto.findAll({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('id')), 'total']
                ],
                where: { tipoVoto: 'branco' },
                raw: true
            });

            const [votosNulos] = await Voto.findAll({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('id')), 'total']
                ],
                where: { tipoVoto: 'nulo' },
                raw: true
            });

            const totalGeral = chapas.reduce((sum, chapa) => 
                sum + parseInt(chapa.total_votos), 0) + 
                parseInt(votosBrancos.total) + 
                parseInt(votosNulos.total);

            return res.status(200).json({
                chapas: chapas.map(chapa => ({
                    numero: chapa.numero,
                    nome: chapa.nome,
                    votos: parseInt(chapa.total_votos)
                })),
                brancos: parseInt(votosBrancos.total),
                nulos: parseInt(votosNulos.total),
                total_geral: totalGeral
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ChapaController(); 