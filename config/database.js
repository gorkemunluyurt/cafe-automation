const { Sequelize } = require("sequelize");
module.exports = new Sequelize(
  "DATABASE_NAME",
  "postgres",
  "POSTGRESQL_PASSWORD",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
