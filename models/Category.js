const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'category',
  timestamps: false,
});

Category.setupAssociations = (models) => {
  Category.belongsToMany(models.Film, {
    through: 'film_category',
    foreignKey: 'category_id',
    otherKey: 'film_id',
    as: 'films',
    onDelete: 'CASCADE',
    hooks: true
  });
};

module.exports = Category;
