const { Router } = require('express')
const PessoaController = require("../controllers/PessoaController")

const router = Router()

router.get('/pessoas', PessoaController.getAll)
router.get('/pessoas/:id', PessoaController.getId)
router.post('/pessoas', PessoaController.createPessoa)

module.exports = router