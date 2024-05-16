const { Router } = require("express");

const userRouter = Router();

const { signupUser, getUsers, logIn } = require("./controlers");
const { hashPass, comparePass } = require("../middleware/auth");

// SignUpUser
userRouter.post("/user/signUp", hashPass, signupUser);

// Get Users
userRouter.get("/user/getUsers", getUsers);

// logIn
userRouter.post("/user/logIn", comparePass, logIn);

module.exports = userRouter;
