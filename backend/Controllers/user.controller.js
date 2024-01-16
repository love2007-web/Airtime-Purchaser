const { userModel } = require("../Models/user.model");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
    let { phoneNumber, password } = req.body;
    const newUser = new userModel({
      phoneNumber,
      password,
    });

    const result = await newUser.save();
    console.log(result);
    res.status(200).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
};

module.exports = { register };
