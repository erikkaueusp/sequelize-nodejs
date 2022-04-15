const database = require('../models')

class PessoaController {


    static async createPessoa(req, res) {
        const pessoa = req.body
        try {
            const pessoaCreated = await database.Pessoas.create(pessoa)
            return res.status(201).json(pessoaCreated)
        } catch (error) {
            return res.status(200).json(error.message)
        }
    }




    static async getAll(req, res) {

        try {
            const all = await database.Pessoas.findAll()
            return res.status(200).json(all)
        } catch (error) {
            return res.status(200).json(error.message)
        }
    }

    static async getId(req, res) {
        const { id } = req.params
        try {

            const one = await database.Pessoas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(one)
        } catch (error) {
            return res.status(200).json(error.message)
        }
    }
}

module.exports = PessoaController