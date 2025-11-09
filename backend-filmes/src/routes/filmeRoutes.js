const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');
const upload = require('../middlewares/uploadMiddleware'); // IMPORTE O UPLOAD

// O 'upload.single('poster')' diz que esperamos 1 arquivo no campo 'poster'
router.post('/', upload.single('poster'), filmeController.createFilme);
router.get('/', filmeController.getAllFilmes);
router.get('/:id', filmeController.getFilmeById);
router.put('/:id', upload.single('poster'), filmeController.updateFilme);
router.delete('/:id', filmeController.deleteFilme);

module.exports = router;