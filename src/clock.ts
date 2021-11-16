import { Queue } from "bullmq";
import { schedule } from "node-cron";

import bots from "./bots";
import connection from "./redis";

const scheduleBots = () => {
  const workQueue = new Queue("bots", { connection: connection() });
  console.log("draining the existing queue");
  workQueue.drain();

  bots.forEach(({ cronTimer, jobName, botName }) => {
    console.log(`scheduling bot ${botName} to run on cron ${cronTimer}`);
    schedule(cronTimer, () => workQueue.add(jobName, {}));
  });
};

scheduleBots();
