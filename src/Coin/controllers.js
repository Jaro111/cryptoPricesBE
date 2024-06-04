const Coin = require("./model");
const User = require("../user/model");
const Portfolio = require("../portfolio/model");

// addCoin to portfolio

const addCoin = async (req, res, next) => {
  try {
    const coin = await Coin.findOne({
      where: {
        coinId: req.body.coinId,
        PortfolioId: req.body.PortfolioId,
      },
    });

    console.log(coin);

    if (coin === null) {
      const coin = await Coin.create({
        coinId: req.body.coinId,
        PortfolioId: req.body.PortfolioId,
      });
      req.coin = coin;
      console.log(coin);
      next();
    } else {
      res.status(500).json({ message: "Coin already in user portfolio" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// get coins by user Id
const getCoins = async (req, res, next) => {
  try {
    const coins = await Coin.findAll({
      where: { PortfolioId: req.body.PortfolioId },
    });

    res.status(200).json({ message: "Coins uploaded", coins: coins });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addCoin, getCoins };
