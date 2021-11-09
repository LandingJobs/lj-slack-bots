import type { WebClient } from "@slack/web-api";

const getUser = async (userId: string, client: WebClient) => {
  try {
    const { ok, error, user } = await client.users.info({ user: userId });
    if (!ok) throw error;
    return user;
  } catch (error) {
    console.error(error);
  }
};

export default getUser;
