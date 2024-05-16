const { Router } = require("express");

const userRouter = Router();

const { signupUser, getUsers } = require("./controlers");

// SignUpUser
userRouter.post("/user/signUp", signupUser);

// Get Users
userRouter.get("/user/getUsers", getUsers);

module.exports = userRouter;
