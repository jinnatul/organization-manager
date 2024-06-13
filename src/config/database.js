import sequelize from 'sequelize';

// Create a new Sequelize instance for database connection
const db = new sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database username
  process.env.DB_PASS, // Database password
  {
    dialect: process.env.DB_DIALECT, // Database dialect (e.g., 'mysql', 'postgres')
    host: process.env.HOST, // Hostname of the database server
    logging: false, // Disable logging of SQL queries
    timezone: process.env.TIMEZONE, // Set the timezone for the database connection
    pool: {
      max: 50, // Maximum number of connections in the pool
      min: 0, // Minimum number of connections in the pool
      acquire: 600000, // Maximum time (in ms) that pool will try to get a connection before throwing error
      idle: 10000, // Maximum time (in ms) that a connection can be idle before being released
    },
  }
);

// Export the configured Sequelize instance
export default db;
