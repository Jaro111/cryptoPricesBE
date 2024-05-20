require("dotenv").config();
const cors = require("cors");
const express = require("express");
const commonRouter = require("./common/routes/routes");
const userRouter = require("./user/routes");
const coinRouter = require("./Coin/routes");
const port = process.env.PORT || 5001;
const User = require("./user/model");
const Coin = require("./Coin/model");

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRouter);
app.use(commonRouter);
app.use(coinRouter);

const syncTables = () => {
  User.hasOne(Coin);
  Coin.belongsTo(User);

  User.sync();
  Coin.sync();
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
