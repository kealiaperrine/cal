import { CommandInt } from "../interfaces/CommandInt";
import CamperModel from "../database/models/CamperModel";
import { MessageEmbed } from "discord.js";

export const view: CommandInt = {
    name: "view",
    description: "View your current 100 days of Code progress",
    run: async (message) => {
        const { author, channel } = message;
        const targetCamperData = await CamperModel.findOne({discordId: author.id});

        // no record
        if(!targetCamperData){
            await channel.send("You have not started the challenge yet.");
            return;
        }

        // return info
        const camperEmbed = new MessageEmbed()
        .setTitle("My 100Doc Progress")
        .setDescription(
            `Here is my 100 Days of Code progress. I last reported an update on ${new Date(
              targetCamperData.timestamp
            ).toLocaleDateString()}.`
          )
        .addField("Round", targetCamperData.round.toString(), true)
        .addField("Day", targetCamperData.day.toString(), true)
        .setAuthor({
            name: author.username + "#" + author.discriminator, 
            url: author.displayAvatarURL()}
          );

          await channel.send({ embeds: [camperEmbed] })
          await message.delete();
    }
}