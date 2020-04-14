const { prefix } = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands"],
  usage: "[command name]",
  // cooldown: 5,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      // data.push("Here's a list of all my commands:");
      // data.push("`" + commands.map(command => command.name).join("`, `") + "`");
      data.push(
        `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
      );
      
      const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle("Help")
      // .setURL('https://discord.js.org/')
      // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
      .setDescription("Here's a list of all my commands:")
      // .setThumbnail('https://i.imgur.com/wSTFkRM.png')
      // .addFields(
      //   { name: 'Regular field title', value: 'Some value here' },
      //   { name: '\u200B', value: '\u200B' },
      //   { name: 'Inline field title', value: 'Some value here', inline: true },
      //   { name: 'Inline field title', value: 'Some value here', inline: true },
      // )
      // .addField('Inline field title', 'Some value here', true)
      .addField("`" + commands.map(command => command.name).join("`, `") + "`",`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`,true)
      // .addField(data)
      // .setImage('https://i.imgur.com/wSTFkRM.png')
      .setTimestamp();
      // .setFooter();

    // message.channel.send(exampleEmbed);

      return message.author
        .send(exampleEmbed)//, { split: true })
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply("I've sent you a DM with all my commands!");
        })
        .catch(error => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply(
            "it seems like I can't DM you! Do you have DMs disabled?"
          );
        });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    // data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true });
  }
};
