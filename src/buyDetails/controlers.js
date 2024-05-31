const BuyDetails = require("./model");
const Coin = require("../Coin/model");
const Portfolio = require("../portfolio/model");

// add buy sell details to coin
const addBuyDetails = async (req, res) => {
  try {
    const coin = await Coin.findOne({
      where: {
        coinId: req.body.coinId,
        PortfolioId: req.body.PortfolioId,
      },
    });
    myId = coin.dataValues.id;

    const buyDetails = await BuyDetails.create({
      CoinId: myId,
      buyPrice: req.body.buyPrice,
      qty: req.body.qty,
      PortfolioId: req.body.PortfolioId,
    });
    res.status(200).json({ message: "Success", coin: buyDetails });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// get Coin details by user and portfolio
const getDetailsByCoinAnUser = async (req, res) => {
  try {
    const buyDetails = await BuyDetails.findAll({
      where: {
        PortfolioId: req.body.PortfolioId,
      },
      include: ["Coin", "User"],
    });

    res.status(200).json({ message: "Success", buyDetails: buyDetails });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addBuyDetails, getDetailsByCoinAnUser };
