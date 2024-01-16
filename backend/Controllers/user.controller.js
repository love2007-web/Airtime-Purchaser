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

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await userModel.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).send({ message: "User not Found", status: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    // const token = generateToken(email)
    if (isMatch) {
      return res.status(200).send({ user, message: "Login Successful", status: true });
      
    }
    return res.status(401).send({ message: "Invalid Password", status: false });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
