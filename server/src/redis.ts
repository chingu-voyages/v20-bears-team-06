import redis from "redis";
import url from "url";

export const redisClient = redis.createClient({
  url: process.env.REDISTOGO_URL,
});
