const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_DEV_USERNAME,
    database: process.env.DB_DEV_NAME,
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_TEST_NAME,
    database: process.env.DB_TEST_NAME,
    password: process.env.DB_TEST_PASSWORD,
    host: process.env.DB_TEST_HOSTNAME,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
