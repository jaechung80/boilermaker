const db = require('./database');
const User = require('./user');
const UserBioData = require('./userBioData');

// Associations
User.hasMany(UserBioData);
UserBioData.belongsTo(User);

module.exports = {
  db,
  User,
  UserBioData,
};
