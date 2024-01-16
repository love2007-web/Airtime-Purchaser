const userRoutes = require("express").Router();
const { register, login } = require("../Controllers/user.controller");

userRoutes.post("/register", register);
userRoutes.post("/login", login);

module.exports = userRoutes;
