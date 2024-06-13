import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import xss from 'xss';
import rateLimit from 'express-rate-limit';
import useragent from 'express-useragent';
import expressWinston from 'express-winston';
import router from './routes/router';
import globalErrorHandler from './utils/errors/globalErrorHandler';
import logger from './utils/logger';

const app = express();

// Middleware to parse JSON bodies
app.use(json());

/** Security Middlewares **/

// Secure HTTP headers
app.use(helmet());
// Prevent HTTP Parameter Pollution
app.use(hpp());
// Trust first proxy (needed for rate limiting, etc.)
app.set('trust proxy', 1);

// User agent middleware to parse user agent info
app.use(useragent.express());

// Cross-Origin Resource Sharing (CORS) configuration
app.use(
  cors({
    methods: [], // Specify allowed methods if needed
  })
);
app.options('*', cors()); // Pre-flight request handling

// XSS sanitization
app.use((req, res, next) => {
  // Function to sanitize input values
  const sanitize = (value) => {
    if (typeof value === 'string') {
      return xss(value); // Sanitize string input
    } else if (typeof value === 'object' && value !== null) {
      for (let key in value) {
        value[key] = sanitize(value[key]); // Recursively sanitize object properties
      }
    }
    return value;
  };

  // Sanitize request data
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);

  next(); // Proceed to the next middleware
});

// Rate limiting to prevent abuse
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 20, // Limit each IP to 20 requests per windowMs
    standardHeaders: true, // Return rate limit info in the RateLimit-* headers
    legacyHeaders: false, // Disable the X-RateLimit-* headers
    message: {
      status: 429,
      message: 'Too many requests created from this IP, please try again after one minute',
    },
  })
);

// Log all requests using Winston
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true, // Include metadata about the request
    msg: 'HTTP {{req.method}} {{req.url}}', // Log format
    expressFormat: true, // Use the default Express/morgan format
    colorize: false, // Disable colorized output
  })
);

// API routes
app.use('/api/v1', router);

// Redirect to API documentation
app.get('/docs', (req, res) => {
  res.redirect('https://github.com/jinnatul/organization-manager/blob/master/README.md'); // Set your API docs link here
});

// Handle all undefined routes
app.all('*', (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  error.statusCode = 404;
  error.flag = true;
  return next(error); // Pass error to the next middleware
});

// Log errors using Winston
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);

// Global error handling middleware
app.use(globalErrorHandler);

export default app;
