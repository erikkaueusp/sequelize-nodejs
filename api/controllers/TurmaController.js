const database = require('../models')
Sequelize = require('sequelize')
const Op = Sequelize.Op

const Services = require('../services/Services')

const { TurmaService } = require('../services')
const serviceTurmas = new TurmaService()


class TurmaController {

    // TODO resolver problemas para mandar para a classe de serviço

    static async getAll(req, res) {
        const { dataInicial, dataFinal } = req.query
        const where = {}
        dataInicial || dataFinal ? where.data_inicio = {} : null
        dataInicial ? where.data_inicio[Op.gte] = dataInicial : null
        dataFinal ? where.data_inicio[Op.lte] = dataFinal : null
        try {
            const todasAsTurmas = await database.Turmas.findAll({ where })
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }

    // CREATE

    static async createTurma(req, res) {
        const turma = req.body
        try {
            const turmaCreated = await serviceTurmas.create(turma)
            return res.status(201).json(turmaCreated)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    //GET ONE

    static async getId(req, res) {
        const { id } = req.params
        try {

            const one = await serviceTurmas.getId(id)
            return res.status(200).json(one)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    // UPDATE

    static async updateTurma(req, res) {
        const { id } = req.params
        const turmaUpdate = req.body

        try {


            await serviceTurmas.update(turmaUpdate, id)

            const responseTurma = await serviceTurmas.getId(id)

            return res.status(200).json(responseTurma)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    // DELETE

    static async delete(req, res) {
        const { id } = req.params

        try {
            await serviceTurmas.delete(id)

            return res.status(200).json(`id: ${id} removido com sucesso!`)

        } catch (error) {
            return res.status(400).json(error.message)
        }
    }


}

module.exports = TurmaController