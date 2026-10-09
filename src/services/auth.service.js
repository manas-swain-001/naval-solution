const User = require('../models/user.model');
const ApiError = require('../utils/apiError');
const { generateAuthToken } = require('./token.service');

const registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, 'Email is already registered');
  }

  const user = await User.create({
    email,
    password
  });

  const token = generateAuthToken(user._id);

  return { user, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateAuthToken(user._id);

  return { user, token };
};

module.exports = {
  registerUser,
  loginUser
};
