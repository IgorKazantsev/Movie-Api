const express = require('express');
const router = express.Router();
const filmActorController = require('../controllers/filmActorController');

router.post('/', filmActorController.addActorToFilm);
router.delete('/:filmId/:actorId', filmActorController.removeActorFromFilm);

module.exports = router;