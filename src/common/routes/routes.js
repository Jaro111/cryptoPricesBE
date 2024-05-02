const { Router } = require("express");

const { requestData } = require("../functions/functions");

const commonRouter = Router();

commonRouter.get("/getCoinData", requestData);

module.exports = commonRouter;
