const Sequelize = require('sequelize');

const db = require('./database.js');

const UserBioData = db.define('UserBioData', {
  weight: {
    type: Sequelize.DECIMAL(10, 2),
  },
  daysTrainedThisWeek: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 7,
      min: 0,
    },
  },
});

module.exports = UserBioData;
