const BuyDetails = require("./model");
const Coin = require("../Coin/model");

// add buy sell details to coin
const addBuyDetails = async (req, res) => {
  try {
    const buyDetails = await BuyDetails.create({
      CoinId: req.body.CoinId,
      UserId: req.body.UserId,
      buyPrice: req.body.buyPrice,
      qty: req.body.qty,
    });
    res.status(200).json({ message: "Success", coin: buyDetails });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// get Coin details by coinmarket capID
const getDetailsByCoinAnUser = async (req, res) => {
  try {
    const coin = await Coin.findOne({
      where: {
        coinId: req.body.coinId,
        UserId: req.body.UserId,
      },
    });

    myId = coin.dataValues.id;

    const buyDetails = await BuyDetails.findAll({
      where: {
        UserId: req.body.UserId,
        CoinId: myId,
      },
      include: "Coin",
    });

    res.status(200).json({ message: "Success", buyDetails: buyDetails });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addBuyDetails, getDetailsByCoinAnUser };
