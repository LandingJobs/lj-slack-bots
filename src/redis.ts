const redisUrl = process.env.REDIS_URL;
const host = redisUrl?.split("@")[1].split(":")[0];
const port = Number(redisUrl?.split(":")[redisUrl?.split(":").length - 1]);
const username = redisUrl?.split(":")[2].split("@")[0];
const password = username;

const config = {
  host,
  port,
  username,
  password,
};

console.log(config);

export default config;

// export const connection = new IORedis({
//   host: redisUrl,
//   port,
//   maxRetriesPerRequest: null,
//   enableReadyCheck: false,
// });
