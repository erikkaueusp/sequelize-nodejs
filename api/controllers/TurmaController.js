const database = require('../models')
Sequelize = require('sequelize')
const Op = Sequelize.Op


class TurmaController {

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
}

module.exports = TurmaController