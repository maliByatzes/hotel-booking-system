import { createClient } from "redis";

const redisUrl = 'redis://localhost:6379';

const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connect successfully');
    redisClient.set('try', 'Welcome to Hotel Booking System');
  } catch (error) {
    console.error(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;
