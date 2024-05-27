const Coin = require("./model");
const User = require("../user/model");
const Portfolio = require("../portfolio/model");

// addCoin to portfolio

const addCoin = async (req, res) => {
  try {
    const coin = await Coin.findOne({
      where: { UserId: req.body.UserId, coinId: req.body.coinId },
    });

    console.log(coin);

    if (coin === null) {
      const coin = await Coin.create({
        coinId: req.body.coinId,
        UserId: req.body.UserId,
        PortfolioId: req.body.PortfolioId,
      });
      res.status(200).json({ message: "Success", coin: coin });
    } else {
      res.status(500).json({ message: "Coin already in user portfolio" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// get coins by user Id
const getCoins = async (req, res) => {
  try {
    const coins = await Coin.findAll({
      where: { UserId: req.body.UserId },
      include: "User",
    });

    res.status(200).json({ message: "Coins uploaded", coins: coins });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addCoin, getCoins };
