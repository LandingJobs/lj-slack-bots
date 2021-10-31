import { schedule } from "node-cron";
import Queue from "bull";

import {
  cronTimer as weekndCronTime,
  jobId as weekndJobId,
} from "./bots/weeknd";

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const workQueue = new Queue("bots", REDIS_URL);

// schedule weeknd bot
schedule(weekndCronTime, async () => {
  await workQueue.add({ bot: weekndJobId });
});
