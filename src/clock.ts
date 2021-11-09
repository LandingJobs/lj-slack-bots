import { schedule } from "node-cron";
import Queue from "bull";

import bots from "./bots";

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const workQueue = new Queue("bots", REDIS_URL);

bots.forEach(({ cronTimer, jobId }) => {
  schedule(cronTimer, () => workQueue.add({ bot: jobId }));
});
