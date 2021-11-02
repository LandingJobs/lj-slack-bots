import { WebClient } from "@slack/web-api";
import isUserOnVacation from "../lib/isUserOnVacation";
import pickRandom from "../lib/pickRandom";

// the types of the package seem to be wrong
declare module "@slack/web-api/dist/response/UsergroupsListResponse" {
  interface Usergroup {
    users?: string[];
  }
}

export const cronTimer = "0 12 * * 1"; // every monday at 12am
export const jobId = "steve";

const client = new WebClient(process.env.SLACK_API_TOKEN);

const sendGroupMessage = async (users: string[]) => {
  try {
    let { ok, channel, error } = await client.conversations.open({
      users: users.join(", "),
    });
    if (!ok) throw error;

    ({ ok, error } = await client.chat.postMessage({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: ":portal_orange_parrot: *Hello girls and boys!!* :portal_blue_parrot:",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "I know I seem loud, but don't mind me, I'm just taking a look around 👀",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: 'You all have been chosen as our weekly :vercel: holy trinity :vercel:.\n\nThis means you\'re "recommended" (:rage:) to schedule a meeting between yourselves.\n\nShare something, become friends, have a nice sporty threeway boxing :boxing_glove: match, whatever!',
          },
        },
      ],
      text: ":portal_blue_parrot: *Hello girls and boys!!* :portal_orange_parrot: I know I seem loud, but don't mind me, I'm just taking a look around 👀 You all have been chosen as our weekly :vercel: holy trinity :vercel:.\nThis just means that you are \"recommended\" (do it, or else...) to schedule a meeting between yourselves.\nShare something, become friends, have a nice sporty threeway boxing match, whatever!",
      channel: channel!.id!,
    }));
    if (!ok) throw error;

    console.log(
      `🤖 - i'm done yelling at ${users.join(", ")} (sorry for the boring ids)`
    );
  } catch (error) {
    console.error(error);
  }
};

const pickRandomPeopleFromDifferentGroups = async () => {
  try {
    // Call the conversations.list method using the built-in WebClient
    const { ok, error, usergroups } = await client.usergroups.list({
      include_disabled: false,
      include_users: true,
    });
    if (!ok) throw error;

    const groups = pickRandom(usergroups!, 3);

    return await Promise.all(
      groups.map(async (group) => {
        let [user] = pickRandom(group.users!, 1);
        let userInfo = await client.users.info({ user });
        while (!userInfo.ok || isUserOnVacation(userInfo.user?.profile)) {
          [user] = pickRandom(group.users!, 1);
          userInfo = await client.users.info({ user });
        }
        return user;
      })
    );
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  const selectedPeople = await pickRandomPeopleFromDifferentGroups();

  if (selectedPeople === undefined)
    console.log("🤖 - i wasn't able to yell at people!");
  else {
    sendGroupMessage(selectedPeople);
    console.log("🤖 - i'm done yelling at people!");
  }
};

export default main;
