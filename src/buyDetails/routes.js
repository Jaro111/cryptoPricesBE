const { Router } = require("express");

const buyDetailsRouter = Router();

const {
  addBuyDetails,
  getBuyDetails,
  updateBuyDetails,
  deleteBuyDetails,
} = require("./controlers");

const {
  requestMultiple,
  requestImgPortfolio,
} = require("../common/functions/functions");

const { deleteCoin } = require("../Coin/controllers");

buyDetailsRouter.post("/buyDetails/addDetais", addBuyDetails);

buyDetailsRouter.post(
  "/buyDetails/getBuyDetails",
  getBuyDetails,
  requestMultiple,
  requestImgPortfolio
);

buyDetailsRouter.post("/buyDetails/updateBuyDetails", updateBuyDetails);

buyDetailsRouter.delete(
  "/buyDetails/deleteBuyDetails",
  deleteBuyDetails,
  deleteCoin
);

module.exports = buyDetailsRouter;
//
