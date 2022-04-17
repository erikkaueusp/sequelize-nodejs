const Services = require('./Services')
const database = require('../models')

class PessoaService extends Services {
    constructor() {
        super('Pessoas');
    }

    async getAllAtivos() {
        return database[this.model].scope('onlyAtivoTrue').findAll()
    }

}

module.exports = PessoaService