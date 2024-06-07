const Portfolio = require("./model");
const Coin = require("../Coin/model");
const BuyDetails = require("../buyDetails/model");

// addPortfolio
const addPortfolio = async (req, res) => {
  const portfolios = await Portfolio.findAll({
    where: { UserId: req.body.UserId },
  });
  const portfolioNo = portfolios.length + 1;
  try {
    const portfoolio = await Portfolio.create({
      title: `Portfolio${portfolioNo}`,
      UserId: req.body.UserId,
    });
    res
      .status(200)
      .json({ message: `Portfolio created`, portfolio: portfoolio });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// getPortfolio
const getPortfolio = async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll({
      where: { UserId: req.body.UserId },
    });

    res.status(200).json({ message: "Uploaded", portfolios: portfolios });
  } catch (error) {
    res.satus(500).json({ message: error.message, error: error });
  }
};

// updatePortfolio
const updatePortfolioName = async (req, res) => {
  try {
    const portfolioUpdate = await Portfolio.update(
      { title: req.body.title },
      {
        where: {
          UserId: req.body.UserId,
          id: req.body.id,
        },
      }
    );

    const portfolio = await Portfolio.findOne({
      where: {
        UserId: req.body.UserId,
        id: req.body.id,
      },
    });

    res
      .status(200)
      .json({ message: `Portfolio updated created`, portfolio: portfolio });
  } catch (error) {
    res.satus(501).json({ message: error.message, error: error });
  }
};

// delete portfolio
const deletePortfolio = async (req, res) => {
  try {
    await BuyDetails.destroy({ where: { PortfolioId: req.body.PortfolioId } });

    await Coin.destroy({ where: { PortfolioId: req.body.PortfolioId } });

    const portfolioList = await Portfolio.findAll({
      where: { UserId: req.body.UserId },
    });
    const portfolioLength = portfolioList.length;

    if (portfolioLength > 1) {
      await Portfolio.destroy({ where: { id: req.body.PortfolioId } });
      res.status(200).json({ message: "Success" });
      return;
    } else {
      res
        .status(200)
        .json({ message: "You need to have at least one portfolio" });
      return;
    }
  } catch (error) {
    res.satus(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  addPortfolio,
  getPortfolio,
  updatePortfolioName,
  deletePortfolio,
};
