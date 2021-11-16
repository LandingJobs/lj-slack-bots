import IORedis from "ioredis";

const host = process.env.REDIS_HOST;
const port = Number(process.env.REDIS_PORT);
const username = process.env.REDIS_USERNAME;
const password = process.env.REDIS_PASSWORD;

console.log(`connecting to redis on host ${host} and port ${port}`);

export const connection = new IORedis({
  host,
  port,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  username,
  password,
});
