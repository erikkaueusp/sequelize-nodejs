const { Router } = require('express')
const PessoaController = require("../controllers/PessoaController")

const router = Router()

// Pessoas

router.get('/pessoas', PessoaController.getAll)
router.get('/pessoas/:id', PessoaController.getId)
router.post('/pessoas', PessoaController.createPessoa)
router.post('/pessoas/:idEstudante/matriculas', PessoaController.createMatricula)
router.put('/pessoas/:id', PessoaController.updatePessoa)
router.delete('/pessoas/:id', PessoaController.delete)

// Matriculas

router.get('/pessoas/:idEstudante/matriculas/:idMatricula', PessoaController.getMatricula)
router.put('/pessoas/:idEstudante/matriculas/:idMatricula', PessoaController.updateMatricula)
router.delete('/pessoas/:idEstudante/matriculas/:idMatricula', PessoaController.deleteMatriculaByEstudante)
    // router.delete('/matriculas/:idMatricula', PessoaController.deleteMatricula)
module.exports = router