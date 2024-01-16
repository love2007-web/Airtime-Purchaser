const jwt = require("jsonwebtoken");
const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error.name === "TokenVerificationError") {
    return res
      .status(401)
      .send({ message: error.message || "Authentication error" });
  } else if ((error.name = "MongoError")) {
    if ((error.code = 11000)) {
      return res
        .status(400)
        .send({
          message:
            "Duplicate key error. Phone Number already exists",
        });
    }
  } else if (error instanceof jwt.JsonWebTokenError) {
    return res
      .status(401)
      .send({ message: error.message || "Authentication error" });
  } else if (error.name === "TokenGenerationError") {
    return res
      .status(500)
      .send({ message: error.message || "Authentication error 2" });
  } else {
    res.status(500).send({ message: "Internal server error" });
  }
  next();
};

module.exports = { errorHandler };
