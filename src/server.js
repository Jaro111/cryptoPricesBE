require("dotenv").config();
const cors = require("cors");
const express = require("express");
const commonRouter = require("./common/routes/routes");
const userRouter = require("./user/routes");
const coinRouter = require("./Coin/routes");
const buyDetailsRouter = require("./buyDetails/routes");
const portfolioRouter = require("./portfolio/routes");
const port = process.env.PORT || 5001;
const User = require("./user/model");
const Coin = require("./Coin/model");
const BuyDetails = require("./buyDetails/model");
const Portfolio = require("./portfolio/model");

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRouter);
app.use(commonRouter);
app.use(coinRouter);
app.use(buyDetailsRouter);
app.use(portfolioRouter);

const syncTables = () => {
  User.hasMany(Coin);
  Coin.belongsTo(User);

  Coin.hasOne(BuyDetails);
  BuyDetails.belongsTo(Coin);
  BuyDetails.belongsTo(User);

  Portfolio.hasOne(Coin);
  Coin.belongsTo(Portfolio);
  Portfolio.belongsTo(User);
  BuyDetails.belongsTo(Portfolio);

  User.sync();
  Coin.sync();
  BuyDetails.sync();
  Portfolio.sync();
};

app.listen(port, () => {
  syncTables();
  console.log(`Server is listening on port ${port}`);
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: " API Healthy" });
});

// Tutorial.hasMany(Comment, { as: "comments" });
// Comment.belongsTo(Tutorial, {
//   foreignKey: "tutorialId",
//   as: "tutorial",
// });
