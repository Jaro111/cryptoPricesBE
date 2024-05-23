const { Router } = require("express");

const portfolioRouter = Router();

const { addPortfolio, getPortfolios } = require("./controllers");

portfolioRouter.post("/user/addPortfolio", addPortfolio);

portfolioRouter.post("/user/getPortfolios", getPortfolios);

module.exports = portfolioRouter;
