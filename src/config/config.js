const dotenv = require("dotenv");

dotenv.config();

const config = {
  PORT: process.env.PORT || 3001,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
module.exports = config

