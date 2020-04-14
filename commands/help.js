const { prefix } = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands"],
  usage: "[command name]",
  // cooldown: 5,
  execute(msg, args) {
    const data = [];
    const { commands } = msg.client;

    if (!args.length) {
      const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle("Help")
      .setDescription("Here's a list of all my commands:")
      .addField("`" + commands.map(command => command.name).join("`, `") + "`",`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`,true)
      .setTimestamp();

      return msg.author
        .send(exampleEmbed)//, { split: true })
        .then(() => {
          if (msg.channel.type === "dm") return;
          msg.reply("I've sent you a DM with all my commands!");
        })
        .catch(error => {
          console.error(
            `Could not send help DM to ${msg.author.tag}.\n`,
            error
          );
          msg.reply(
            "it seems like I can't DM you! Do you have DMs disabled?"
          );
        });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return msg.reply("that's not a valid command!");
    }

    const helpCom = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle(`**Name:** ${command.name}`)
      .setTimestamp();

    if (command.aliases)
      helpCom.addField(`**Aliases:**`,`${command.aliases.join(", ")}`);
    if (command.description)
      helpCom.addField(`**Description:**`,` ${command.description}`);
    if (command.usage)
      helpCom.addField(`**Usage:**`,`${prefix}${command.name} ${command.usage}`);

    msg.channel.send(helpCom);
  }
};
