import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";
import { CommandList } from "./_CommandList";

export const help : CommandInt = {
    name: "help",
    description: "List of available commands",
    run : async (message) => {
        const helpEmbed = new MessageEmbed()
        .setTitle("Available Commands:")
        .setDescription("Use these")
        .addField("Commands:", CommandList.map((el) => `\`!${el.name}\`: ${el.description}`).join("\n"));

        await message.channel.send({ embeds: [helpEmbed] });
    }
}