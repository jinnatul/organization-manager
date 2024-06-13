import { Router } from 'express';
import organizationRouter from './organizationRouter';

// Create a new Express router instance
const router = Router();

// Mount the organizationRouter under the '/organizations' path
router.use('/organizations', organizationRouter);

// Export the router for use in other parts of the application
export default router;
