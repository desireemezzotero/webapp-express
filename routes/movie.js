const express = require('express');
const router = express.Router()
const movieController = require('../controllers/movieController')
const multer = require('../middlewares/multer');
const upload = require('../middlewares/multer');

router.get('/', movieController.index);
router.get('/:id', movieController.show);
router.post('/:id', movieController.store)
router.post('/',upload.single('image'), movieController.storeMovie)

module.exports = router