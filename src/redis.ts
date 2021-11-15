import IORedis from "ioredis";

const LOCAL_REDIS_URL = "redis://127.0.0.1"
const REDIS_URL = process.env.REDIS_URL || LOCAL_REDIS_URL;
const isLocal = REDIS_URL === LOCAL_REDIS_URL

export const connection = new IORedis({ host: REDIS_URL, port: isLocal ? 6379 : undefined });
