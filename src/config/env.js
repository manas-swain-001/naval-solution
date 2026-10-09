require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/naval_solution',
  jwt: {
    secret: process.env.JWT_SECRET || 'default_jwt_secret_dev_change_me',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    cookieMaxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
  }
};

module.exports = config;
