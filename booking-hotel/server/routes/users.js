const express = require("express");
const userRouter = express.Router();
const { userController } = require("../controllers/users");
const AuthController = require("../services/auth");

userRouter.post("/addUser", userController.addUser);
userRouter.post("/login", AuthController.login);

module.exports = userRouter;
