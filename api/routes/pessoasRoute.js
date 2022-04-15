const { Router } = require('express')
const PessoaController = require("../controllers/PessoaController")

const router = Router()

router.get('/pessoas', PessoaController.getAll)
router.get('/pessoas/:id', PessoaController.getId)
router.post('/pessoas', PessoaController.createPessoa)
router.put('/pessoas/:id', PessoaController.updatePessoa)
router.delete('/pessoas/:id', PessoaController.delete)

module.exports = router