const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');

// Расширенный поиск и связанные актёры (📌 обязательно выше :id)
router.get('/search/actor', filmController.searchByActor);
router.get('/search/language', filmController.searchByLanguage);
router.get('/search/category', filmController.searchByCategory);
router.get('/:id/actors', filmController.getFilmActors);

// Основные
router.get('/', filmController.getAllFilms);
router.get('/:id', filmController.getFilmById);
router.post('/', filmController.createFilm);
router.put('/:id', filmController.updateFilm);
router.delete('/:id', filmController.deleteFilm);

module.exports = router;
