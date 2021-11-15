import IORedis from "ioredis";

const localRedisUrl = "redis://127.0.0.1:6379";
const redisUrl =
  process.env.REDIS_URL?.slice(0, process.env.REDIS_URL.lastIndexOf(":")) ||
  localRedisUrl;
console.log(redisUrl);
const splitByColon = redisUrl.split(":");
const port = Number(splitByColon[splitByColon.length - 1]);

export const connection = new IORedis({
  host: redisUrl,
  port,
});
