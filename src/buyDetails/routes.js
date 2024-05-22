const { Router } = require("express");

const buyDetailsRouter = Router();

const { addBuyDetails, getDetailsByCoinAnUser } = require("./controlers");

buyDetailsRouter.post("/buyDetails/addDetais", addBuyDetails);

buyDetailsRouter.post("/buyDetails/getCoinDetails", getDetailsByCoinAnUser);

module.exports = buyDetailsRouter;
