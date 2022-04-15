const { Router } = require('express')
const PessoaController = require("../controllers/PessoaController")

const router = Router()

router.get('/pessoas', PessoaController.getAll)
router.get('/pessoas/:id', PessoaController.getId)
router.get('/pessoas/:idEstudante/matriculas/:idMatricula', PessoaController.getMatricula)
router.post('/pessoas', PessoaController.createPessoa)
router.post('/pessoas/:idEstudante/matriculas', PessoaController.createMatricula)
router.put('/pessoas/:id', PessoaController.updatePessoa)
router.delete('/pessoas/:id', PessoaController.delete)

module.exports = router