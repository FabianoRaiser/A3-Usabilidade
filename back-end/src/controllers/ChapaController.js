const Controller = require('./Controller');
const { Chapa, Voto } = require('../models');

class ChapaController extends Controller {
    constructor() {
        super(Chapa);
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
}

module.exports = new ChapaController(); 