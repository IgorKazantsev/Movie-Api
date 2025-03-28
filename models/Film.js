const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Film = sequelize.define('Film', {
  film_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: DataTypes.TEXT,
  release_year: DataTypes.INTEGER,
  language_id: DataTypes.INTEGER,
  length: DataTypes.INTEGER,
  rating: DataTypes.STRING(10),
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'film',
  timestamps: false
});

Film.setupAssociations = (models) => {
  Film.belongsTo(models.Language, {
    foreignKey: 'language_id',
    as: 'language'
  });

  Film.belongsToMany(models.Category, {
    through: 'film_category',
    foreignKey: 'film_id',
    otherKey: 'category_id',
    as: 'categories',
    onDelete: 'CASCADE',
    hooks: true
  });

  Film.belongsToMany(models.Actor, {
    through: 'film_actor',
    foreignKey: 'film_id',
    otherKey: 'actor_id',
    as: 'actors',
    onDelete: 'CASCADE',
    hooks: true
  });
};

module.exports = Film;
