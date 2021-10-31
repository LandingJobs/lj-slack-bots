import { WebClient } from "@slack/web-api";

// WebClient insantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.SLACK_API_TOKEN);

// Post a message to a channel your app is in using ID and message text
const publishMessage = async (id: string, text: string) => {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await client.chat.postMessage({
      channel: id,
      text: text,
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const pickRandomPeople = async () => {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await client.users.list();

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  await pickRandomPeople();
};

export default main;
