const Portfolio = require("./model");

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

module.exports = { addPortfolio, getPortfolio };
