/**
 * Sends detailed error response in development environment.
 * 
 * @param {Error} err - The error object
 * @param {Object} res - Express response object
 */
const sendErrorDev = (err, res) => {
  // Send detailed error response with status code, status, error details, message, and stack trace
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * Sends concise error response in production environment.
 * 
 * @param {Error} err - The error object
 * @param {Object} res - Express response object
 */
const sendErrorProd = (err, res) => {
  // Send concise error response with status code, status, and message
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

/**
 * Global error handling middleware.
 * 
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export default (err, req, res, next) => {
  // Log the error
  console.log('Global', err);
  
  // Set default status code and status if not provided
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Determine environment and send appropriate error response
  if (process.env.STAGE === 'Development') {
    // In development environment, send detailed error response
    sendErrorDev(err, res);
  } else {
    // In production environment, send concise error response
    sendErrorProd(err, res);
  }
};
