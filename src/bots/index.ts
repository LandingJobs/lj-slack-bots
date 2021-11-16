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
    jobName: weekndJobId,
    cronTimer: weekndCronTimer,
  },
  {
    botName: "randomConvoBot",
    bot: randomConvoBot,
    jobName: randomConvoJobId,
    cronTimer: randomConvoCronTimer,
  },
];

export default bots;
