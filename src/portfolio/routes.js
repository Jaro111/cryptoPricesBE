const { Router } = require("express");

const portfolioRouter = Router();

const { addPortfolio, getPortfolio } = require("./controllers");

portfolioRouter.post("/user/addPortfolio", addPortfolio);

portfolioRouter.post("/user/getPortfolio", getPortfolio);

module.exports = portfolioRouter;
