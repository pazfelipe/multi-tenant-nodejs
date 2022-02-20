const configs = {
  PORT: process.env.PORT,
  DB: {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_URL: process.env.DB_HOST_URL
  }
};

module.exports = configs;