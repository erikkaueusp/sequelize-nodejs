const database = require('../models')

class TurmaController {

    static async getAll(req, res) {
        try {
            const todasAsTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}

module.exports = TurmaController