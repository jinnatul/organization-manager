/**
 * Sends a response message with optional status code.
 * 
 * @param {Object} res - Express response object
 * @param {string} message - The message to be sent in the response
 * @param {number} status - Optional status code for the response (default: 200)
 */
const sendMessage = (res, message, status) => {
  // Set default status code to 200 if not provided
  const statusCode = status ? status : 200;
  
  // Send response with status code and message
  res.status(statusCode).json({
    status: 'ok',
    message,
  });
};

export default sendMessage;
