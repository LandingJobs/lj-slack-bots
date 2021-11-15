import randomConvoBot, {
  cronTimer as randomConvoCronTimer,
  botName as randomConvoJobId,
} from "./steve";
import weekndBot, {
  cronTimer as weekndCronTimer,
  botName as weekndJobId,
} from "./weeknd";

const bots = [
  {
    botName: "weekndBot",
    bot: weekndBot,
    jobId: weekndJobId,
    cronTimer: weekndCronTimer,
  },
  {
    botName: "randomConvoBot",
    bot: randomConvoBot,
    jobId: randomConvoJobId,
    cronTimer: randomConvoCronTimer,
  },
];

export default bots;
