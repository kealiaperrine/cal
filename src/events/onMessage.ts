import { Message } from "discord.js";
import { CommandList } from "../commands/_CommandList";

export const onMessage = async (message: Message) => {
    console.log(message.content)

    const prefix = "!";

    if (message.author.bot) {
        return;
    }
    if(!message.content.startsWith(prefix)) {
        return;
    }

    //TODO : change command list to hash map -> if message in hash.keys
    for (const Command of CommandList) {
        if (message.content.startsWith(prefix + Command.name)) {
            await Command.run(message);
            break;
        }
    }
    
};