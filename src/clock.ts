import { schedule } from "node-cron";
import Queue from "bull";

// Connect to a local redis intance locally, and the Heroku-provided URL in production
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

// Create / Connect to a named work queue
const workQueue = new Queue("bots", REDIS_URL);

// Kick off a new job by adding it to the work queue
schedule("* * * * * 4", async () => {
  // This would be where you could pass arguments to the job
  // Docs: https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd
  const job = await workQueue.add({ bot: "weeknd" });
  console.log(job);
});
