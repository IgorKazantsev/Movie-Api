const { Film, Actor } = require('../models');

// Добавить актёра к фильму
exports.addActorToFilm = async (req, res) => {
  try {
    const { filmId, actorId } = req.body;

    const film = await Film.findByPk(filmId);
    const actor = await Actor.findByPk(actorId);

    if (!film || !actor) {
      return res.status(404).json({ error: 'Film or Actor not found' });
    }

    await film.addActor(actor);
    res.status(200).json({ message: 'Actor added to film' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить актёра из фильма
exports.removeActorFromFilm = async (req, res) => {
  try {
    const { filmId, actorId } = req.params;

    const film = await Film.findByPk(filmId);
    const actor = await Actor.findByPk(actorId);

    if (!film || !actor) {
      return res.status(404).json({ error: 'Film or Actor not found' });
    }

    await film.removeActor(actor);
    res.status(200).json({ message: 'Actor removed from film' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
