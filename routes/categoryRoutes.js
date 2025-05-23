// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Основные CRUD операции
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

// Дополнительные методы
router.get('/search/name', categoryController.searchByName);
router.get('/:id/films', categoryController.getCategoryFilms);

module.exports = router;