const database = require('../models')

class PessoaController {

    static async getAll(req, res) {

        try {
            const all = await database.Pessoas.findAll()
            return res.status(200).json(all)
        } catch (error) {
            return res.status(200).json(error.message)
        }


    }
}

module.exports = PessoaController