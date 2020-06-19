import redis from "redis";

export const redisClient = redis.createClient({
  url: process.env.REDISTOGO_URL,
});
