const bcrypt = require("bcrypt");

const User = require("../user/model");

const saltRounds = parseInt(process.eventNames.SALT_ROUNDS);

// Hash pass

const hashPass = async (req, res, next) => {
  try {
    const hashpassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashpassword;
    console.log("password: ", req.body.password);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// compare psss

const comparePass = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // console.log(user);
    const myPassword = user.dataValues.password;

    const checkPassword = await bcrypt.compare(req.body.password, myPassword);
    console.log(checkPassword);

    if (!checkPassword) {
      res.status(401).json({ message: "Wrong password" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.staus(501).json({ message: error.message, error: error });
  }
};

module.exports = { hashPass, comparePass };
