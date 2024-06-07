const { Router } = require("express");

const portfolioRouter = Router();

const {
  addPortfolio,
  getPortfolio,
  updatePortfolioName,
  deletePortfolio,
} = require("./controllers");

// add portfolio
portfolioRouter.post("/user/addPortfolio", addPortfolio);

// get portfolio
portfolioRouter.post("/user/getPortfolio", getPortfolio);

// update portfolio name
portfolioRouter.post("/user/updatePortfolioName", updatePortfolioName);

// delete portfolio

portfolioRouter.delete("/user/deletePortfolio", deletePortfolio);

module.exports = portfolioRouter;
