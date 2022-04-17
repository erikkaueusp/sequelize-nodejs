const database = require('../models')
const Services = require('../services/Services')

const serviceNiveis = new Services('niveis')
class NivelController {

    static async getAll(req, res) {
        try {
            const todosOsNiveis = await serviceNiveis.getAll()
            return res.status(200).json(todosOsNiveis)
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }

    // CREATE

    static async createNivel(req, res) {
        const nivel = req.body
        try {
            const nivelCreated = await database.Niveis.create(nivel)
            return res.status(201).json(nivelCreated)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    //GET ONE

    static async getId(req, res) {
        const { id } = req.params
        try {

            const one = await serviceNiveis.getId(id)
            return res.status(200).json(one)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    // UPDATE

    static async updateNivel(req, res) {
        const { id } = req.params
        const nivelUpdate = req.body

        try {


            await serviceNiveis.update(nivelUpdate, id)

            const responseNivel = await serviceNiveis.getId(id)

            return res.status(200).json(responseNivel)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    // DELETE

    static async delete(req, res) {
        const { id } = req.params

        try {
            await serviceNiveis.delete(id)

            return res.status(200).json(`id: ${id} removido com sucesso!`)

        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

}

module.exports = NivelController