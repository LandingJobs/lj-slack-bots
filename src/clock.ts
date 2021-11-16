import { Queue } from "bullmq";

import bots from "./bots";
import { connection } from "./redis";

const scheduleBots = () => {
  const workQueue = new Queue("bots", { connection });
  workQueue.drain();

  bots.forEach(({ cronTimer, botName }) =>
    workQueue.add(botName, {}, { repeat: { cron: cronTimer } })
  );
};

scheduleBots();
