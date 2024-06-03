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
const Portfolio = require("./portfolio/model");
const BuyDetails = require("./buyDetails/model");

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRouter);
app.use(commonRouter);
app.use(coinRouter);
app.use(portfolioRouter);
app.use(buyDetailsRouter);

const syncTables = () => {
  User.hasOne(Portfolio);
  Portfolio.belongsTo(User);

  Portfolio.hasOne(Coin);
  Coin.belongsTo(Portfolio);

  Coin.hasOne(BuyDetails);
  BuyDetails.belongsTo(Coin);

  Portfolio.hasOne(BuyDetails);
  BuyDetails.belongsTo(Portfolio);

  User.sync();
  Portfolio.sync();
  Coin.sync();
  BuyDetails.sync();
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
