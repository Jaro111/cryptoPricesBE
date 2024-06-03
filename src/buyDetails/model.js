const { DataTypes } = require("sequelize");

const sequelize = require("../db/connection");

const BuyDetails = sequelize.define("BuyDetais", {
  buyPrice: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 0,
  },
  qty: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 0,
  },
});

module.exports = BuyDetails;
