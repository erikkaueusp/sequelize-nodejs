// const database = require('../models')
// const Sequelize = require('sequelize')

const Services = require('../services/Services')

const servicePessoas = new Services('Pessoas')
class PessoaController {


    // CREATE

    static async createPessoa(req, res) {
        const pessoa = req.body
        try {
            const pessoaCreated = await servicePessoas.create(pessoa)
            return res.status(201).json(pessoaCreated)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }


    // GET ALL

    static async getAll(req, res) {

        try {
            const all = await servicePessoas.getAll()
            return res.status(200).json(all)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }


    static async getAllAtivo(req, res) {

        try {
            const all = await database.Pessoas.scope('onlyAtivoTrue').findAll()
            return res.status(200).json(all)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    //GET ONE

    static async getId(req, res) {
        const { id } = req.params
        try {

            const one = await servicePessoas.getId(id)
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


            await servicePessoas.update(pessoaUpdate, id)

            const responsePessoa = await servicePessoas.getId(id)

            return res.status(200).json(responsePessoa)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }


    // DELETE

    static async delete(req, res) {
        const { id } = req.params

        try {
            servicePessoas.delete(id)

            return res.status(200).json(`id: ${id} removido com sucesso!`)

        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    static async createMatricula(req, res) {
        const { idEstudante } = req.params
        const matriculaParams = {...req.body, estudante_id: Number(idEstudante) }
        try {

            const createdMatricula = await database.Matriculas.create(matriculaParams)
            return res.status(200).json(createdMatricula)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    static async getMatricula(req, res) {
        const { idEstudante, idMatricula } = req.params
        try {

            const one = await database.Matriculas.findOne({ where: { id: Number(idMatricula), estudante_id: Number(idEstudante) } })
            return res.status(200).json(one)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    static async updateMatricula(req, res) {
        const { idEstudante, idMatricula } = req.params
        const matriculaUpdate = req.body
        try {

            await database.Matriculas.update(matriculaUpdate, { where: { id: Number(idMatricula), estudante_id: Number(idEstudante) } })
            const one = await database.Matriculas.findOne({ where: { id: Number(idMatricula), estudante_id: Number(idEstudante) } })
            return res.status(200).json(one)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    static async deleteMatricula(req, res) {
        const { idMatricula } = req.params

        try {
            await database.Matriculas.destroy({ where: { id: Number(idMatricula) } })

            return res.status(200).json(`id: ${id} removido com sucesso!`)

        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    static async deleteMatriculaByEstudante(req, res) {
        const { idEstudante, idMatricula } = req.params

        try {
            await database.Matriculas.destroy({ where: { id: Number(idMatricula), id: Number(idEstudante) } })

            return res.status(200).json(`id: ${id} removido com sucesso!`)

        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    static async undoPessoa(req, res) {
        const { id } = req.params

        try {

            await database.Pessoas.restore({ where: { id: Number(id) } })

            return res.status(200).json(`Undo para pessoa com id: ${id} realizado com sucesso!`)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    static async getMatriculasConfirmadas(req, res) {
        const { idEstudante } = req.params

        try {

            const pessoas = await database.Pessoas.findOne({ where: { id: Number(idEstudante) } })
            const matriculas = await pessoas.getAulasMatriculadas()

            return res.status(200).json(matriculas)

        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    static async getMatriculasByTurma(req, res) {
        const { turmaId } = req.params
        try {
            const todasAsMatriculas = await database.Matriculas
                .findAndCountAll({
                    where: {
                        turma_id: Number(turmaId),
                        status: 'confirmado'
                    },
                    limit: 20,
                    order: [
                        ['estudante_id', 'DESC']
                    ]
                })
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    static async getTurmasLotadas(req, res) {
        const lotacaoTurma = 2
        try {
            const turmasLotadas = await database.Matriculas
                .findAndCountAll({
                    where: {
                        status: 'confirmado'
                    },
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                })
            return res.status(200).json(turmasLotadas.count)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    static async desativaPessoa(req, res) {
        const { idEstudante } = req.params
        try {
            database.sequelize.transaction(async transacao => {
                await database.Pessoas
                    .update({ ativo: false }, { where: { id: Number(idEstudante) } }, { transaction: transacao })
                await database.Matriculas
                    .update({ status: 'cancelado' }, { where: { estudante_id: Number(idEstudante) } }, { transaction: transacao })
                return res.status(200).json({ message: `matrículas ref. estudante ${idEstudante} canceladas` })
            })
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }


}

module.exports = PessoaController