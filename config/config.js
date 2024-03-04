require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DATABASE || "artbook",
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
  },
  test: {
    username: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: "artbook-test",
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
  },
  production: {
    username: process.env.POSTGRES_USERNAME_PROD,
    password: process.env.POSTGRES_PASSWORD_PROD,
    database: process.env.POSTGRES_DATABASE_PROD,
    host: process.env.POSTGRES_HOST_PROD,
    dialect: "postgres",
  },
};
