import { Router } from 'express';
import { getEmployees } from '../controllers/organizationController';

// Create a new Express router instance
const router = Router();

// Define route for getting employees based on position ID
router.get('/employees/:id', getEmployees);

// Export the router for use in other parts of the application
export default router;
