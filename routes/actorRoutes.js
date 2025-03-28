// routes/actorRoutes.js
const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');

// Оставьте только базовые CRUD методы сначала
router.get('/', actorController.getAllActors);
router.get('/:id', actorController.getActorById);
router.post('/', actorController.createActor);
router.put('/:id', actorController.updateActor);
router.delete('/:id', actorController.deleteActor);

// Позже раскомментируйте, когда методы будут реализованы:
// router.get('/search/name', actorController.searchByName);
// router.get('/:id/films', actorController.getActorFilms);

module.exports = router;