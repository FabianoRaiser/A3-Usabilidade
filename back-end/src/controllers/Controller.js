class Controller {
    constructor(model) {
        this.model = model;
    }

    // Criar
    async create(req, res) {
        try {
            const item = await this.model.create(req.body);
            return res.status(201).json(item);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Listar todos
    async findAll(req, res) {
        try {
            const items = await this.model.findAll();
            return res.status(200).json(items);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Buscar por ID
    async findOne(req, res) {
        try {
            const item = await this.model.findByPk(req.params.id);
            if (!item) {
                return res.status(404).json({ message: 'Item não encontrado' });
            }
            return res.status(200).json(item);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Atualizar
    async update(req, res) {
        try {
            const [updated] = await this.model.update(req.body, {
                where: { id: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'Item não encontrado' });
            }
            const updatedItem = await this.model.findByPk(req.params.id);
            return res.status(200).json(updatedItem);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Deletar
    async delete(req, res) {
        try {
            const deleted = await this.model.destroy({
                where: { id: req.params.id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Item não encontrado' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = Controller; 