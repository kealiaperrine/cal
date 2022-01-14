import { CommandInt } from "../interfaces/CommandInt";
import CamperModel from "../database/models/CamperModel";
import { MessageEmbed, EmbedAuthorData } from "discord.js";

export const oneHundred: CommandInt = {
    name : "100",
    description : "Creates a 100 Days of Code update",
    run : async (message) => {
        const{ author, channel, content } = message;
        const text = content.split(" ").slice(1).join(" ")
        let targetCamperData = await CamperModel.findOne({discordId: author.id})

        // if user has not sent before, create new record
        if (!targetCamperData) {
            console.log("making new record")
            targetCamperData = await CamperModel.create({
                discordId: author.id,
                round: 1,
                day: 0,
                timestamp: Date.now()
              });
        }

        // update day that user is on
        targetCamperData.day++;
        // if day greater, than 100, reset to 1
        if (targetCamperData.day > 100) {
            targetCamperData.day = 1;
            targetCamperData.round++;
        }
        targetCamperData.timestamp = Date.now();

        // save changes made to document
        await targetCamperData.save();

        // creating embedded message the bot should send
        const oneHundredEmbed = new MessageEmbed();
        oneHundredEmbed.setTitle("100 Days of Code");
        oneHundredEmbed.setDescription(text);
        
        oneHundredEmbed.setAuthor({name: author.username + "#" + author.discriminator, url: author.displayAvatarURL()});
        console.log(targetCamperData.round, targetCamperData.day)
        console.log(targetCamperData.round as unknown as string, targetCamperData.day as unknown as string)
        oneHundredEmbed.addField("Round", targetCamperData.round.toString(), true);
        oneHundredEmbed.addField("Day", targetCamperData.day.toString(), true);

        oneHundredEmbed.setFooter({
            text: "Day completed: " + new Date(targetCamperData.timestamp).toLocaleDateString()}     
          );
      
          // docs updated
          await channel.send({ embeds: [oneHundredEmbed] });
          await message.delete();
    }
}
