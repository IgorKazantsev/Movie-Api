const { Language, Film } = require('../models');
const { Op } = require('sequelize');

// Получить все языки
exports.getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.findAll();
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить язык по ID
exports.getLanguageById = async (req, res) => {
  try {
    const language = await Language.findByPk(req.params.id);
    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }
    res.json(language);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создать язык
exports.createLanguage = async (req, res) => {
  try {
    const { name, last_update = new Date() } = req.body;

    const language = await Language.create({ name, last_update });
    res.status(201).json(language);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновить язык
exports.updateLanguage = async (req, res) => {
  try {
    const { name, last_update = new Date() } = req.body;

    const [updated] = await Language.update(
      { name, last_update },
      { where: { language_id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Language not found' });
    }

    const updatedLanguage = await Language.findByPk(req.params.id);
    res.json(updatedLanguage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить язык и все фильмы на нём
exports.deleteLanguage = async (req, res) => {
  try {
    const language = await Language.findByPk(req.params.id, {
      include: [{ model: Film, as: 'films' }]
    });

    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }

    // Удалить фильмы на этом языке (если есть)
    await Promise.all(language.films.map(film => film.destroy()));
    await language.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить все фильмы на определённом языке
exports.getLanguageFilms = async (req, res) => {
  try {
    const language = await Language.findByPk(req.params.id, {
      include: [{ model: Film, as: 'films' }]
    });

    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }

    res.json(language.films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
