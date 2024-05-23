const sequelize = require("../db/connection");
const { DataTypes } = require("sequelize");

const Portfolio = sequelize.define("Portfolio", {
  title: {
    type: DataTypes.STRING,
  },
});

module.exports = Portfolio;
