const generateToken = require("../utils/generateToken");
const userRepository = require("../repositories/user.repository");

const register = async (userData) => {
  const existingUser = await userRepository.findByEmail(userData.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await userRepository.create(userData);

  const token = generateToken(user._id);

  return {
    user,
    token,
  };
};

const login = async (email, password) => {
  const user = await userRepository.findByEmailWithPassword(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  return {
    user,
    token,
  };
};

module.exports = {
  register,
  login,
};
