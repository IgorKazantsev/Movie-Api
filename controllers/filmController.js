const { Film, Actor, Category, Language } = require('../models');
const { Op } = require('sequelize');

// Получить все фильмы с поиском, пагинацией и сортировкой
exports.getAllFilms = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'title', order = 'ASC', title, actor, language, category } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (title) where.title = { [Op.like]: `%${title}%` };
    if (language) where.language_id = language;

    const include = [
      { model: Language, as: 'language' },
      {
        model: Category,
        as: 'categories',
        ...(category ? { where: { category_id: category } } : {})
      },
      {
        model: Actor,
        as: 'actors',
        ...(actor ? { where: { actor_id: actor } } : {})
      }
    ];

    const { count, rows } = await Film.findAndCountAll({
      where,
      limit: +limit,
      offset,
      order: [[sort, order]],
      include,
      distinct: true // важно при подсчёте с JOIN'ами
    });

    res.json({
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: +page,
      films: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить фильм по ID
exports.getFilmById = async (req, res) => {
  try {
    const film = await Film.findByPk(req.params.id, {
      include: [
        { model: Language, as: 'language' },
        { model: Category, as: 'categories' },
        { model: Actor, as: 'actors' }
      ]
    });

    if (!film) return res.status(404).json({ error: 'Film not found' });
    res.json(film);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создать фильм
exports.createFilm = async (req, res) => {
  try {
    const { actors = [], categories = [], ...filmData } = req.body;
    const film = await Film.create(filmData);
    if (actors.length) await film.addActors(actors);
    if (categories.length) await film.addCategories(categories);

    const createdFilm = await Film.findByPk(film.film_id, {
      include: ['actors', 'categories', 'language']
    });

    res.status(201).json(createdFilm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновить фильм
exports.updateFilm = async (req, res) => {
  try {
    const { actors, categories, ...filmData } = req.body;
    const [updated] = await Film.update(filmData, {
      where: { film_id: req.params.id }
    });

    if (!updated) return res.status(404).json({ error: 'Film not found' });
    const film = await Film.findByPk(req.params.id);
    if (actors) await film.setActors(actors);
    if (categories) await film.setCategories(categories);

    const updatedFilm = await Film.findByPk(req.params.id, {
      include: ['actors', 'categories', 'language']
    });

    res.json(updatedFilm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить фильм
exports.deleteFilm = async (req, res) => {
  try {
    const film = await Film.findByPk(req.params.id);
    if (!film) return res.status(404).json({ error: 'Film not found' });

    await film.setActors([]);
    await film.setCategories([]);
    await film.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Поиск фильмов по имени актёра
exports.searchByActor = async (req, res) => {
  try {
    const { name } = req.query;
    const films = await Film.findAll({
      include: [
        {
          model: Actor,
          as: 'actors',
          where: {
            [Op.or]: [
              { first_name: { [Op.like]: `%${name}%` } },
              { last_name: { [Op.like]: `%${name}%` } }
            ]
          }
        },
        { model: Category, as: 'categories' },
        { model: Language, as: 'language' }
      ]
    });
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Поиск фильмов по языку
exports.searchByLanguage = async (req, res) => {
  try {
    const { name } = req.query;
    const films = await Film.findAll({
      include: [
        {
          model: Language,
          as: 'language',
          where: { name: { [Op.like]: `%${name}%` } }
        },
        { model: Category, as: 'categories' },
        { model: Actor, as: 'actors' }
      ]
    });
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Поиск фильмов по категории
exports.searchByCategory = async (req, res) => {
  try {
    const { name } = req.query;
    const films = await Film.findAll({
      include: [
        {
          model: Category,
          as: 'categories',
          where: { name: { [Op.like]: `%${name}%` } }
        },
        { model: Language, as: 'language' },
        { model: Actor, as: 'actors' }
      ]
    });
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить всех актёров, снявшихся в фильме
exports.getFilmActors = async (req, res) => {
  try {
    const film = await Film.findByPk(req.params.id, {
      include: [{ model: Actor, as: 'actors' }]
    });

    if (!film) {
      return res.status(404).json({ error: 'Film not found' });
    }

    res.json(film.actors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


