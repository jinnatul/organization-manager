import { createLogger, format } from 'winston';
import dailyRotateFile from 'winston-daily-rotate-file';

// Create a Winston logger instance
const logger = createLogger({
  // Set log level to 'info' (you can adjust this as needed)
  level: 'info',
  // Configure log format to include timestamp and JSON format
  format: format.combine(format.timestamp(), format.json()),
  // Configure transports (where logs will be stored)
  transports: [
    // Add a transport for daily rotated log files
    new dailyRotateFile({
      // Define the filename pattern for log files (with date placeholders)
      filename: 'logs/%DATE%-combined.log',
      // Define the date pattern for log rotation (daily rotation)
      datePattern: 'YYYY-MM-DD',
      // Define the maximum size of each log file (20 MB)
      maxSize: '20m',
      // Define the maximum number of log files to keep (14 days)
      maxFiles: '14d',
    }),
  ],
});

// Export the logger instance
export default logger;
