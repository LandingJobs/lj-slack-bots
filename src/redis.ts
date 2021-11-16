import IORedis from "ioredis";

const redisUrl = process.env.REDIS_URL;
const host = redisUrl?.split("@")[1].split(":")[0];
const port = Number(redisUrl?.split(":")[redisUrl?.split(":").length - 1]);
const password = redisUrl?.split(":")[2].split("@")[0];

export const config = {
  host,
  port,
  password,
};

console.log("redis config", { host: config.host, port: config.port });

const connection = () =>
  new IORedis({
    ...config,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });

export default connection;
