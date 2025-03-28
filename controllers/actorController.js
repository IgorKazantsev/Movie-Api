const { Actor, Film } = require('../models');
const { Op } = require('sequelize');

// Получить всех актёров
exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.findAll();
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить актёра по ID
exports.getActorById = async (req, res) => {
  try {
    const actor = await Actor.findByPk(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: 'Actor not found' });
    }
    res.json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создать актёра
exports.createActor = async (req, res) => {
  try {
    const { first_name, last_name, last_update = new Date() } = req.body;

    const actor = await Actor.create({ first_name, last_name, last_update });
    res.status(201).json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновить актёра
exports.updateActor = async (req, res) => {
  try {
    const { first_name, last_name, last_update = new Date() } = req.body;

    const [updated] = await Actor.update(
      { first_name, last_name, last_update },
      { where: { actor_id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Actor not found' });
    }

    const actor = await Actor.findByPk(req.params.id);
    res.json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить актёра (и отвязать от фильмов)
exports.deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findByPk(req.params.id, {
      include: [{ model: Film, as: 'films' }]
    });

    if (!actor) {
      return res.status(404).json({ error: 'Actor not found' });
    }

    await actor.setFilms([]);
    await actor.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Поиск по имени или фамилии
exports.searchByName = async (req, res) => {
  try {
    const { name } = req.query;

    const actors = await Actor.findAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.like]: `%${name}%` } },
          { last_name: { [Op.like]: `%${name}%` } }
        ]
      }
    });

    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
