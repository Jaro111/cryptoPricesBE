const BuyDetails = require("./model");
const Coin = require("../Coin/model");
const Portfolio = require("../portfolio/model");

// add buy details to coin
const addBuyDetails = async (req, res) => {
  try {
    const coin = req.coin;

    myId = coin.dataValues.id;

    const buyDetails = await BuyDetails.create({
      CoinId: myId,
      PortfolioId: req.body.PortfolioId,
    });

    const coinDetails = await BuyDetails.findOne({
      where: {
        coinId: myId,
        PortfolioId: req.body.PortfolioId,
      },
      include: ["Coin", "Portfolio"],
    });

    const portfolioName = coinDetails.dataValues.Portfolio.dataValues.title;

    res
      .status(200)
      .json({ message: `Added to ${portfolioName}`, coin: coinDetails });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// update Buy Details

const updateBuyDetails = async (req, res) => {
  try {
    const coin = await Coin.findOne({
      where: {
        coinId: req.body.coinId,
        PortfolioId: req.body.PortfolioId,
      },
    });
    myId = coin.dataValues.id;

    const updateDetails = await BuyDetails.update(
      { buyPrice: req.body.buyPrice, qty: req.body.qty },
      { where: { CoinId: myId, PortfolioId: req.body.PortfolioId } }
    );
    const details = await BuyDetails.findOne({
      where: {
        coinId: myId,
        PortfolioId: req.body.PortfolioId,
      },
      include: "Coin",
    });
    res.status(200).json({ message: "Success", details: details });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// get Coin details by coin and portfolio
const getBuyDetails = async (req, res, next) => {
  try {
    const coin = await Coin.findOne({
      where: { PortfolioId: req.body.PortfolioId },
    });

    myId = coin.dataValues.id;

    const buyDetails = await BuyDetails.findAll({
      where: {
        PortfolioId: req.body.PortfolioId,
      },
      include: ["Coin", "Portfolio"],
    });

    // res.status(200).json({ message: "Success", buyDetails: buyDetails });

    req.buyDetails = buyDetails;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addBuyDetails, getBuyDetails, updateBuyDetails };
