const { Router } = require("express");

const coinRouter = Router();

const { addCoin, getCoins } = require("./controllers");
const { addBuyDetails } = require("../buyDetails/controlers");

// add coin

coinRouter.post("/coin/addCoin", addCoin, addBuyDetails);

// get coins by user portfolio

coinRouter.post("/coin/getCoins", getCoins);

module.exports = coinRouter;
