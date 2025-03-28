const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Actor extends Model {}

Actor.init({
  actor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
  
}, {
  sequelize,
  modelName: 'Actor',
  tableName: 'actor',
  timestamps: false
});

Actor.setupAssociations = (models) => {
  Actor.belongsToMany(models.Film, {
    through: 'film_actor',
    foreignKey: 'actor_id',
    otherKey: 'film_id',
    as: 'films',
    onDelete: 'CASCADE',
    hooks: true
  });
};

module.exports = Actor;
