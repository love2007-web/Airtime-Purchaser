const userRoutes = require("express").Router();
const { register } = require("../Controllers/user.controller");

userRoutes.post("/register", register);

module.exports = userRoutes;
