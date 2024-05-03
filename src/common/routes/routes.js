const { Router } = require("express");

const { requestData, requestImages } = require("../functions/functions");

const commonRouter = Router();

// Get data
commonRouter.post("/getCoinData", requestData, requestImages);

// // GetImages
// commonRouter.post("/getLogo", requestImages);

module.exports = commonRouter;
