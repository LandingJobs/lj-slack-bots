import { WebClient } from "@slack/web-api";
import { Member } from "@slack/web-api/dist/response/UsersListResponse";
import { User } from "@slack/web-api/dist/response/UsersInfoResponse";

import pickRandom from "../lib/pickRandom";
import isUserOnVacation from "../lib/isUserOnVacation";

export const cronTimer = "0 11 * * 1"; // every monday at 11am
export const jobId = "weeknd";

const client = new WebClient(process.env.SLACK_API_TOKEN);

const sendMessage = async (user: Member | User) => {
  try {
    const { ok, error } = await client.chat.postMessage({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "🎉🎉🎉 *You are the lucky winner!!* 🎉🎉🎉",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "You've been chosen to share _\"voluntarily\"_ some pictures 📷 of your super fun weekend.\nIf you're weekend wasn't fun, get some stock pictures from Google 🤪",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Share them right now!! (on the #random channel)",
          },
        },
      ],
      text: "🎉🎉🎉 *You are the lucky winner!!* 🎉🎉🎉 You've been chosen to share _\"voluntarily\"_ some pictures 📷 of your super fun weekend.\nIf you're weekend wasn't fun, get some stock pictures from Google 🤪 Share them right now!! (on the #random channel).",
      channel: user.id!,
    });
    if (!ok) throw error;

    console.log(
      `🤖 - i'm done yelling at ${user.real_name ?? user.name ?? "someone(?)"}`
    );
  } catch (error) {
    console.error(error);
  }
};

const pickRandomPeople = async () => {
  try {
    const { ok, members, error } = await client.users.list();
    if (!ok) throw error;

    return pickRandom(
      members!.filter(
        ({ deleted, is_workflow_bot, is_bot, is_app_user, profile }) =>
          !deleted &&
          !is_app_user &&
          !is_bot &&
          !is_workflow_bot &&
          !isUserOnVacation(profile)
      ),
      3
    );
  } catch (error) {
    console.error(error);
  }
};

// const pickUser = async (userId: string) => {
//   try {
//     const { ok, error, user } = await client.users.info({ user: userId });
//     if (!ok) throw error;
//     return user;
//   } catch (error) {
//     console.error(error);
//   }
// };

const main = async () => {
  const selectedPeople = await pickRandomPeople();
  // for testing
  // const selectedPeople = [await pickUser("U02DFN1AW3T")];

  if (selectedPeople === undefined)
    console.log("🤖 - i wasn't able to yell at people!");
  else {
    selectedPeople
      .filter((user) => user !== undefined)
      .forEach((user) => sendMessage(user!));
    console.log("🤖 - i'm done yelling at people!");
  }
};

export default main;
