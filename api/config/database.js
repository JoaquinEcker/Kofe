const Sequelize = require("sequelize");

module.exports = new Sequelize("kofedb", null, null, {
  dialect: "postgres",
  host: "localhost",
  logging: false,
});
