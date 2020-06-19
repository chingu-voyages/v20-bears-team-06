import Redis from "ioredis";

export const redis = new Redis(
  "redis://redistogo:6b3c47b6095058cb31ad2d9e17d4652a@dory.redistogo.com:9976/"
);
