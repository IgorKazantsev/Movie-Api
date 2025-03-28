const express = require('express');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Подключаем роуты
app.use('/actors', require('./routes/actorRoutes'));
app.use('/films', require('./routes/filmRoutes'));
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/languages', require('./routes/languageRoutes'));
app.use('/film-actor', require('./routes/filmActorRoutes'));
app.use('/film-category', require('./routes/filmCategoryRoutes'));

// Корневой маршрут (опционально)
app.get('/', (req, res) => {
  res.send('🎬 Welcome to the Sakila REST API!');
});

// Обработка несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
