const { Router } = require("express");

const portfolioRouter = Router();

const {
  addPortfolio,
  getPortfolio,
  updatePortfolioName,
} = require("./controllers");

portfolioRouter.post("/user/addPortfolio", addPortfolio);

portfolioRouter.post("/user/getPortfolio", getPortfolio);

portfolioRouter.post("/user/updatePortfolioName", updatePortfolioName);

module.exports = portfolioRouter;
