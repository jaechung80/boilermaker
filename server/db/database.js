const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/training-manager',
  {
    logging: false,
  }
);

module.exports = db;
