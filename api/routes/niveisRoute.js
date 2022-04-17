const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const router = Router()

router.get('/niveis', NivelController.getAll)
router.get('/niveis/:id', NivelController.getId)
router.post('/niveis', NivelController.createNivel)
router.put('/niveis/:id', NivelController.updateNivel)
router.delete('/niveis/:id', NivelController.delete)

module.exports = router