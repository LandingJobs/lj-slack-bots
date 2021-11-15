import IORedis from "ioredis";

const localRedisUrl = "redis://127.0.0.1";
const redisUrl =
  process.env.REDIS_URL?.slice(0, process.env.REDIS_URL.lastIndexOf(":")) ||
  localRedisUrl;
const isLocal = redisUrl === localRedisUrl;
const port = isLocal ? 6379 : Number(redisUrl.split(":").at(-1));

export const connection = new IORedis({
  host: redisUrl,
  port,
});
