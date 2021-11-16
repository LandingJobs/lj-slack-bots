import IORedis from "ioredis";

const localRedisUrl = "redis://127.0.0.1:6379";
const redisUrl = process.env.REDIS_URL ?? localRedisUrl;

export const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy: (times) => (times < 10 ? times : null),
});
