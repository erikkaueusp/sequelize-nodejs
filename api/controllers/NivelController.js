const database = require('../models')

class NivelController {

    static async getAll(req, res) {
        try {
            const todosOsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}

module.exports = NivelController