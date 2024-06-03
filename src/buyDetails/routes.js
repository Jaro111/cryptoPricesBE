const { Router } = require("express");

const buyDetailsRouter = Router();

const { addBuyDetails, getBuyDetails } = require("./controlers");
getBuyDetails;
buyDetailsRouter.post("/buyDetails/addDetais", addBuyDetails);

buyDetailsRouter.post("/buyDetails/getBuyDetails", getBuyDetails);

module.exports = buyDetailsRouter;
