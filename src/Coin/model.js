const { DataTypes } = require("sequelize");

const sequelize = require("../db/connection");

const Coin = sequelize.define("Coin", {
  coinId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Coin;
