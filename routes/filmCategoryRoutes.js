const express = require('express');
const router = express.Router();
const filmCategoryController = require('../controllers/filmCategoryController');

router.post('/', filmCategoryController.addCategoryToFilm);
router.delete('/:filmId/:categoryId', filmCategoryController.removeCategoryFromFilm);

module.exports = router;