import randomConvoBot, {
  cronTimer as randomConvoCronTimer,
  jobId as randomConvoJobId,
} from "./steve";
import weekndBot, {
  cronTimer as weekndCronTimer,
  jobId as weekndJobId,
} from "./weeknd";

const bots = [
  {
    botId: "weekndBot",
    bot: weekndBot,
    jobId: weekndJobId,
    cronTimer: weekndCronTimer,
  },
  {
    botId: "randomConvoBot",
    bot: randomConvoBot,
    jobId: randomConvoJobId,
    cronTimer: randomConvoCronTimer,
  },
];

export default bots;
