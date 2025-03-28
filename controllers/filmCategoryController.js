const { Film, Category } = require('../models');

// Добавить категорию к фильму
exports.addCategoryToFilm = async (req, res) => {
  try {
    const { filmId, categoryId } = req.body;

    const film = await Film.findByPk(filmId);
    const category = await Category.findByPk(categoryId);

    if (!film || !category) {
      return res.status(404).json({ error: 'Film or Category not found' });
    }

    await film.addCategory(category);
    res.status(200).json({ message: 'Category added to film' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить категорию из фильма
exports.removeCategoryFromFilm = async (req, res) => {
  try {
    const { filmId, categoryId } = req.params;

    const film = await Film.findByPk(filmId);
    const category = await Category.findByPk(categoryId);

    if (!film || !category) {
      return res.status(404).json({ error: 'Film or Category not found' });
    }

    await film.removeCategory(category);
    res.status(200).json({ message: 'Category removed from film' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
