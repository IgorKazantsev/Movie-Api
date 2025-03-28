const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Language = sequelize.define('Language', {
  language_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
  
}, {
  tableName: 'language',
  timestamps: false
});

Language.setupAssociations = (models) => {
  Language.hasMany(models.Film, {
    foreignKey: 'language_id',
    as: 'films',
    onDelete: 'CASCADE',
    hooks: true
  });
};

module.exports = Language;
