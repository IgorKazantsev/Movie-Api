const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const db = {};
const basename = path.basename(__filename);

// Загружаем все модели из этой папки
fs.readdirSync(__dirname)
  .filter(file =>
    file.endsWith('.js') &&
    file !== basename
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    const modelName = model.name;

    if (modelName) {
      db[modelName] = model;
    }
  });

// Настройка ассоциаций
Object.values(db).forEach(model => {
  if (typeof model.setupAssociations === 'function') {
    model.setupAssociations(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
