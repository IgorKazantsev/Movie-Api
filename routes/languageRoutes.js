const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');

// Основные CRUD операции
router.get('/', languageController.getAllLanguages);
router.get('/:id', languageController.getLanguageById);
router.post('/', languageController.createLanguage);
router.put('/:id', languageController.updateLanguage);
router.delete('/:id', languageController.deleteLanguage);

// Дополнительные методы
router.get('/:id/films', languageController.getLanguageFilms);

module.exports = router;