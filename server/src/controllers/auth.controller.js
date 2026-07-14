const authService = require("../services/auth.service");
const cookieOptions = require("../utils/cookieOptions");

const register = async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await authService.login(
      req.body.email,
      req.body.password,
    );

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const me = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

module.exports = {
  register,
  login,
  logout,
  me,
};
