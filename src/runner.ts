import throng from "throng";
import Queue, { ProcessCallbackFunction } from "bull";

import weeknd, { jobId as weekndJobId } from "./bots/weeknd";

// Connect to a local redis instance locally, and the Heroku-provided URL in production
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

function start() {
  // Connect to the named work queue
  const workQueue = new Queue("bots", REDIS_URL);

  const process: ProcessCallbackFunction<{ bot: string }> = (job) => {
    if (job.data.bot === weekndJobId) weeknd();
  };
  workQueue.process(50, process);
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ start });
