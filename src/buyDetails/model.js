const { DataTypes } = require("sequelize");

const sequelize = require("../db/connection");

const BuyDetails = sequelize.define("BuyDetais", {
  buyPrice: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = BuyDetails;
