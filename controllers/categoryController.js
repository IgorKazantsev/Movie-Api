const { Category, Film } = require('../models');
const { Op } = require('sequelize');

// Получить все категории
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить категорию по ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создать категорию
exports.createCategory = async (req, res) => {
  try {
    const { name, last_update = new Date() } = req.body;

    const category = await Category.create({ name, last_update });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновить категорию
exports.updateCategory = async (req, res) => {
  try {
    const { name, last_update = new Date() } = req.body;

    const [updated] = await Category.update(
      { name, last_update },
      { where: { category_id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const updatedCategory = await Category.findByPk(req.params.id);
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить категорию и отвязать от фильмов
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Film, as: 'films' }]
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.setFilms([]); // отвязываем связи
    await category.destroy();    // удаляем

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Поиск по имени
exports.searchByName = async (req, res) => {
  try {
    const { name } = req.query;

    const categories = await Category.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить все фильмы в категории
exports.getCategoryFilms = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{
        model: Film,
        as: 'films',
        through: { attributes: [] }
      }]
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category.films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
