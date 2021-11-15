import { Queue, Worker } from "bullmq";

import bots from "./bots";
import { connection } from "./redis";

function start() {
  new Worker(
    "bots",
    async (job) => bots.find(({ jobId }) => jobId === job.data.bot)?.bot(),
    { connection }
  );
}

start();
