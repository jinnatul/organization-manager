import axios from 'axios';
import positions from '../models/positions';
import sendData from '../utils/responses/sendData';
import { getEmployeeHierarchyByPosition } from '../services/employeeService';
import { validateGetEmployees } from '../models/validations';

/**
 * Controller to get employees based on position ID.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getEmployees = async (req, res, next) => {
  try {
    // Validate the request parameters
    await validateGetEmployees.validateAsync(req.params);

    // Extract the position ID from the request parameters
    const { id } = req.params;

    // Fetch position information from the database
    const positionInfo = await positions.findOne({
      where: {
        id, // ID must match the request parameter
        is_deleted: false, // Position must not be marked as deleted
      },
    });

    // If position is not found, create an error and pass it to the next middleware
    if (!positionInfo) {
      const error = new Error('Position not found!');
      error.flag = true;
      error.statusCode = 404;
      return next(error);
    }

    // Fetch employee hierarchy information based on the position ID
    const employeesInfo = await getEmployeeHierarchyByPosition(id);

    // 3rd party api call
    await axios.get(process.env.API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.JWT_TOKEN}`,
      },
    });

    // Send the employee hierarchy information as a response
    sendData(res, employeesInfo);
  } catch (err) {
    // If the error does not have a status code, set it to 500 (Internal Server Error)
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    // Pass the error to the next middleware
    next(err);
  }
};
