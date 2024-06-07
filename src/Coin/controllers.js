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

    if (coin === null) {
      const coin = await Coin.create({
        coinId: req.body.coinId,
        PortfolioId: req.body.PortfolioId,
      });
      req.coin = coin;
      next();
    } else {
      const existCoin = await Coin.findOne({
        where: {
          coinId: req.body.coinId,
          PortfolioId: req.body.PortfolioId,
        },
        include: "Portfolio",
      });
      const portfolioName = existCoin.Portfolio.dataValues.title;
      res.status(200).json({ message: `Coin already in ${portfolioName}` });
      return;
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

// Delete Coin

const deleteCoin = async (req, res) => {
  try {
    // const myCoin = await Coin.findOne({
    //   where: { PortfolioId: req.body.PortfolioId, coinId: req.body.coinId },
    // });

    // myId = myCoin.dataValues.id;
    const myCoin = req.myCoin;

    await Coin.destroy({
      where: {
        PortfolioId: myCoin.dataValues.PortfolioId,
        id: myCoin.dataValues.id,
      },
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addCoin, getCoins, deleteCoin };
