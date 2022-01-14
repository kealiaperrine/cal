// USE GIT BASH TO RUN

import { Client } from "discord.js";
import { connectDatabase } from "./database/connectDatabase";
import { validateEnv } from "./utils/validateEnv";
import { onMessage } from "./events/onMessage";

(async () => {
  if (!validateEnv()) {
    console.log("fucked");
    return;
  }

  const BOT = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

  BOT.on("ready", () => console.log("Connected to Discord!"));
  BOT.on("messageCreate", async (message) => await onMessage(message));
  await connectDatabase();
  await BOT.login(process.env.BOT_TOKEN);
})();
