import { Message } from "discord.js";

const BOT_ADMIN = process.env.BOT_ADMIN || "";

export default async function massban(message: Message): Promise<void> {
  try {
    if (message.author.id !== BOT_ADMIN) {
      message.reply("Missing permissions");
      return;
    }

    const arg = message.content.split(" ").slice(2).join(" ");
    if (!arg) {
      message.reply("You must provide a valid query string");
      return;
    }

    await message.reply(
      `Searching for all users that meet the provided query: \`${arg}\`...`
    );

    const members = await message.guild.members.fetch({
      query: arg,
    });

    message.reply(members.size.toString());
  } catch (err) {
    console.log(err);
    message.reply("There was an error");
  }
}
