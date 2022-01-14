import { CommandInt } from "../interfaces/CommandInt";

//user will put in ID when calling the command

export const edit: CommandInt = {
    name: "edit",
    description: "Edits a previous 100 Days of Code post",
    run : async (message) => {
        const { author, channel, content } = message;
        // destructure from message content
        const [, targetId, ...text] = content.split(" ");

        // searching for old message using the message id
        const targetMessage = await channel.messages.fetch(targetId);

        // invalid id/message does not exist
        if (!targetMessage) {
            await channel.send("Nope. Try again.");
            return;
        }

        //NOTE :  Because your bot sends the message as an embed, the content property you are used to working with will be empty
        // Instead, you can find the embed within the embeds property.
        const targetEmbed = targetMessage.embeds[0];
 
        // confirm embed is one of user's posts
        if (
            targetEmbed.author?.name !==
            author.username + "#" + author.discriminator
          ) {
            await channel.send(
              "This does not appear to be your 100 Days of Code post. You cannot edit it."
            );
            return;
          }
      
          targetEmbed.setDescription(text.join(" "));
      
          await targetMessage.edit({ embeds: [targetEmbed] });
          //TODO : wanted to send again so you can see edit, but changed the ID and the round/day didnt display right
        //   await channel.send({ embeds: [targetEmbed] });
          await message.delete();
    }
}