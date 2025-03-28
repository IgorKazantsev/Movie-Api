const { Sequelize } = require('sequelize');
require('dotenv').config();

// Создаем экземпляр Sequelize
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    },
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }
);

// Проверка подключения
sequelize.authenticate()
  .then(() => console.log('✅ Database connection established'))
  .catch(err => console.error('❌ Connection error:', err));

// Экспортируем сам экземпляр sequelize и класс Sequelize
module.exports = {
  sequelize,  // Экземпляр подключения
  Sequelize   // Класс Sequelize для определения моделей
};