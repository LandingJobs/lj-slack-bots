import IORedis from "ioredis";

const localRedisUrl = "redis://127.0.0.1:6379";
const redisUrl = process.env.REDIS_URL ?? localRedisUrl;
const port = Number(redisUrl?.slice(redisUrl.lastIndexOf(":") + 1));

export const connection = new IORedis({
  host: redisUrl,
  port,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});
