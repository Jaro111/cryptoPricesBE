require("dotenv").config();
const cors = require("cors");
const express = require("express");

const commonRouter = require("./common/routes/routes");

const port = process.env.PORT || 5001;

const app = express();

const User = require("./user/model");
const userRouter = require("./user/routes");
app.use(cors());

app.use(express.json());
const syncTables = () => {
  User.sync();
};

app.use(userRouter);
app.use(commonRouter);

app.listen(port, () => {
  syncTables();
  console.log(`Server is listening on port ${port}`);
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: " API Healthy" });
});
