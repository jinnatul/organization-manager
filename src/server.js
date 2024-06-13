import app from './app';
import sequelize from './config/database';

// Establish a connection to the database using Sequelize
sequelize
  // Uncomment the following line if you need to create tables using the model definitions
  // .sync()
  .authenticate() // Authenticate the connection to the database
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Failed!!! Please check your connection credentials!', err);
  });       

// Set the port for the Express server to listen on
const port = process.env.PORT || 5000;

// Start the Express server and log the port and environment mode
app.listen(port, () => {
  console.log(`The server is running on port ${port} in ${process.env.STAGE} mode`);
});
