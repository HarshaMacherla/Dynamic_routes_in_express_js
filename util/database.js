const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_complete", "root", "harsha997", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
