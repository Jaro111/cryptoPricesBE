const { Router } = require("express");

const {
  requestData,
  requestImages,
  requestCoin,
  requestById,
  requestSingleImage,
  requestMultiple,
} = require("../functions/functions");

const commonRouter = Router();

// Get data
commonRouter.post("/getCoinData", requestData, requestImages);

// getCoin
commonRouter.get("/getCoinIds", requestCoin);

// getSingleCoin
commonRouter.post("/getSingleCoin", requestById, requestSingleImage);

// get multiple Coins by id
commonRouter.post("/getMultipleCoin", requestMultiple, requestImages);

module.exports = commonRouter;
