/**
 * Sends successful response data with optional status code.
 * 
 * @param {Object} res - Express response object
 * @param {any} data - Data to be sent in the response
 * @param {number} status - Optional status code for the response (default: 200)
 */
const sendData = (res, data, status) => {
  // Set default status code to 200 if not provided
  const statusCode = status ? status : 200;
  
  // Send response with status code and data
  res.status(statusCode).json({
    status: 'ok',
    data,
  });
};

export default sendData;
