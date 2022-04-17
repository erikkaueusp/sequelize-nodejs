const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')

const router = Router()

router.get('/turmas', TurmaController.getAll)
router.get('/turmas:id', TurmaController.getId)
router.post('/turmas', TurmaController.createTurma)
router.put('/turmas/:id', TurmaController.updateTurma)
router.delete('/turmas/:id', TurmaController.delete)

module.exports = router