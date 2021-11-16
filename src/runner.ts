import { Worker } from "bullmq";

import bots from "./bots";
import connection from "./redis";

function start() {
  new Worker(
    "bots",
    async (job) => {
      console.log(`running job ${job.name} (id: ${job.id})`);
      bots.find(({ jobName }) => jobName === job.name)?.bot();
    },
    { connection }
  );
}

start();
