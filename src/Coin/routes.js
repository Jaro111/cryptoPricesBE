const { Router } = require("express");

const coinRouter = Router();

const { addCoin, getCoins } = require("./controllers");

// add coin

coinRouter.post("/coin/addCoin", addCoin);

// get coins

coinRouter.post("/coin/getCoins", getCoins);

module.exports = coinRouter;
