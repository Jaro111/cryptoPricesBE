const { Router } = require("express");

const {
  requestData,
  requestImages,
  requestCoin,
  requestById,
  requestSingleImage,
} = require("../functions/functions");

const commonRouter = Router();

// Get data
commonRouter.post("/getCoinData", requestData, requestImages);

// getCoin
commonRouter.get("/getCoinIds", requestCoin);

// getSingleCoin
commonRouter.post("/getSingleCoin", requestById, requestSingleImage);

// // GetImages
// commonRouter.post("/getLogo", requestImages);

module.exports = commonRouter;
