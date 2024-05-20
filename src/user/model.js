const { gasConstantDependencies } = require("mathjs");
const { DataTypes } = require("sequelize");

const sequelize = require("../db/connection");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    unique: false,
  },
});

module.exports = User;
