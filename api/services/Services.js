const database = require('../models')


class Services {
    constructor(model) {
        this.model = model
    }

    async create(entity) {
        return database[this.model].create(entity)
    }

    async getAll() {
        return database[this.model].findAll()
    }

    async getId(id) {

        return database[this.model].findOne({ where: { id: Number(id) } })

    }

    async update(entityUpdate, id) {

        database[this.model].update(entityUpdate, { where: { id: Number(id) } })

    }

    async delete(id) {

        database[this.model].destroy({ where: { id: Number(id) } })

    }
}

module.exports = Services