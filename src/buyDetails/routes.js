const { Router } = require("express");

const buyDetailsRouter = Router();

const {
  addBuyDetails,
  getBuyDetails,
  updateBuyDetails,
} = require("./controlers");

buyDetailsRouter.post("/buyDetails/addDetais", addBuyDetails);

buyDetailsRouter.post("/buyDetails/getBuyDetails", getBuyDetails);

buyDetailsRouter.post("/buyDetails/updateBuyDetails", updateBuyDetails);

module.exports = buyDetailsRouter;
//
