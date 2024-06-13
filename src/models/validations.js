import Joi from 'joi';

// Define a Joi schema for validating the 'id' parameter in the getEmployees function
export const validateGetEmployees = Joi.object({
  id: Joi.number() // Validate 'id' as a number
    .required() // 'id' is required
    .error(new Error('Please provide hierarchy info!')), // Custom error message if 'id' is missing
});
