const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepository.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = authenticate;
