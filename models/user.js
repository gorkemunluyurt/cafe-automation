const Sequelize = require("sequelize");
const db = require("../config/database.js");

const User = db.define("users", {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

module.exports = User;
