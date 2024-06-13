// For Sequelize CLI (only needed if Sequelize CLI version >= 4.0.0)
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: process.env.TIMEZONE,
    pool: {
      max: 50,
      min: 0,
      acquire: 600000,
      idle: 10000,
    },
  },
};
