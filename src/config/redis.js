import { createClient } from 'redis';

// Create a new Redis client instance
const redisClient = createClient();

// Connect to the Redis server
redisClient.connect();

// Event listener for successful connection
redisClient.on('connect', () => {
  console.log('Redis connection has been established successfully');
});

// Event listener for connection errors
redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Export the configured Redis client instance
export default redisClient;
