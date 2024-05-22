const User = require("./model");
const Coin = require("../Coin/model");
const BuyDetails = require("../buyDetails/model");

// Signup user
const signupUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({ message: `${user.username} created`, user: user });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

// Get Users

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ message: "Users uploades", users: users });
  } catch (error) {
    res.status(501).json({ message: error.message, eroor: error });
  }
};

// Log in

const logIn = async (req, res) => {
  try {
    res.status(200).json({
      message: `${req.user.username} Successfull logged in`,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};
module.exports = { signupUser: signupUser, getUsers: getUsers, logIn: logIn };
