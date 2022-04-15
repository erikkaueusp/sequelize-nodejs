const database = require('../models')

class PessoaController {


    // CREATE

    static async createPessoa(req, res) {
        const pessoa = req.body
        try {
            const pessoaCreated = await database.Pessoas.create(pessoa)
            return res.status(201).json(pessoaCreated)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }


    // GET ALL

    static async getAll(req, res) {

        try {
            const all = await database.Pessoas.findAll()
            return res.status(200).json(all)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }


    //GET ONE

    static async getId(req, res) {
        const { id } = req.params
        try {

            const one = await database.Pessoas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(one)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }


    // UPDATE

    static async updatePessoa(req, res) {
        const { id } = req.params
        const pessoaUpdate = req.body

        try {


            await database.Pessoas.update(pessoaUpdate, { where: { id: Number(id) } })

            const responsePessoa = await database.Pessoas.findOne({ where: { id: Number(id) } })

            return res.status(200).json(responsePessoa)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }


    // DELETE
    static async delete(req, res) {
        const { id } = req.params

        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } })

            return res.status(200).json(`id: ${id} removido com sucesso!`)

        } catch (error) {
            return res.status(400).json(error.message)
        }
    }


}

module.exports = PessoaController