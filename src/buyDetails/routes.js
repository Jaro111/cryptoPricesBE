const { Router } = require("express");

const buyDetailsRouter = Router();

const {
  addBuyDetails,
  getBuyDetails,
  updateBuyDetails,
} = require("./controlers");

const {
  requestMultiple,
  requestImgPortfolio,
} = require("../common/functions/functions");

buyDetailsRouter.post("/buyDetails/addDetais", addBuyDetails);

buyDetailsRouter.post(
  "/buyDetails/getBuyDetails",
  getBuyDetails,
  requestMultiple,
  requestImgPortfolio
);

buyDetailsRouter.post("/buyDetails/updateBuyDetails", updateBuyDetails);

module.exports = buyDetailsRouter;
//
