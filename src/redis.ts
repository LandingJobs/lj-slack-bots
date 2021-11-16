import IORedis from "ioredis";

const localRedisUrl = "redis://127.0.0.1:6379";
const redisUrl = process.env.REDIS_URL ?? localRedisUrl;
const host = redisUrl?.slice(0, redisUrl.lastIndexOf(":"));
const port = Number(redisUrl?.slice(redisUrl.lastIndexOf(":") + 1));

console.log(`connecting to redis on host ${host} and port ${port}`);

export const connection = new IORedis({
  host,
  port,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});
