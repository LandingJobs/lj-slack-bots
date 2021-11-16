import { Queue } from "bullmq";

import bots from "./bots";
import connection from "./redis";

const scheduleBots = () => {
  const workQueue = new Queue("bots", { connection });
  console.log("draining the existing queue");
  workQueue.drain();

  bots.forEach(({ cronTimer, botName }) => {
    console.log(`scheduling bot ${botName} to run on cron ${cronTimer}`);
    workQueue.add(botName, {}, { repeat: { cron: cronTimer } });
  });
};

scheduleBots();
