// Import necessary modules
import request from 'supertest';
import app from './src/app';
import redisClient from './src/config/redis';

// Describe block for testing GET endpoint '/api/v1/organizations/employees/:id'
describe('GET /api/v1/organizations/employees/:id', () => {
  let server; // Declare server variable to hold the Express server instance

  // beforeAll hook to set up prerequisites before running tests
  beforeAll(async () => {
    // Check if Redis client is not connected
    if (!redisClient.connected) {
      // Wait for Redis client to connect before continuing
      await new Promise((resolve, reject) => {
        // Event listener for successful Redis connection
        redisClient.on('connect', () => {
          // Start the Express server once Redis is connected
          server = app.listen();
          resolve(); // Resolve the promise once server is started
        });

        // Event listener for Redis connection error
        redisClient.on('error', (err) => {
          console.error('Redis connection error:', err); // Log Redis connection error
          reject(err); // Reject the promise if there's an error
        });
      });
    }
  }, 10000); // Set timeout for this hook to 10 seconds

  // afterAll hook to perform cleanup after all tests have finished
  afterAll(async () => {
    await redisClient.quit(); // Quit/close the Redis client connection
    server.close(); // Close the Express server after all tests
  }, 10000); // Set timeout for this hook to 10 seconds

  // Test case to verify successful response with status 200 and valid employee data
  test('responds with status 200 and valid employee data', async () => {
    const response = await request(server).get('/api/v1/organizations/employees/1');
    expect(response.statusCode).toBe(200); // Assert HTTP status code is 200
    expect(response.body.status).toBe('ok'); // Assert response body contains expected data
  }, 10000); // Set timeout for this test case to 10 seconds

  // Test case to verify response with status 404 for non-existing employee ID
  test('responds with status 404 for non-existing employee ID', async () => {
    const response = await request(server).get('/api/v1/organizations/employees/999');
    expect(response.statusCode).toBe(404); // Assert HTTP status code is 404
  }, 10000); // Set timeout for this test case to 10 seconds

  // Test case to verify response with status 500 for invalid employee ID
  test('responds with status 500 for invalid employee ID', async () => {
    const response = await request(server).get('/api/v1/organizations/employees/invalidID');
    expect(response.statusCode).toBe(500); // Assert HTTP status code is 500
  }, 10000); // Set timeout for this test case to 10 seconds
});
