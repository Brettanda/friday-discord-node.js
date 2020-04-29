const { prefix } = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "help",
  hidden: true,
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands","?", ""],
  usage: "[command name]",
  // cooldown: 5,
  execute(msg, args,bot) {
    const data = [];
    const { commands } = msg.client;

    if (!args.length) {
      const coms = commands.filter(com => !com.hidden);
      const helpEmbed = new Discord.MessageEmbed()
      .setColor("#fdfdfd")
      .setTitle("Friday - Help")
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription("Here's a list of all my commands:")
      .addField("`" + coms.map(command => !command.hidden ? command.name : '').join("`, `") + "`",`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`,true)
      .setFooter(msg.author.tag,msg.author.displayAvatarURL())
      .setTimestamp();

      // // .addField("`" + commands.map(command => command.name).join("`, `") + "`",`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`,true)
      // console.info(commands.length);
      // // for(var i = 0;i<commands.length;i++) {
      // commands.map(command => helpEmbed.addField(command.name,command.aliases ? command.aliases.join(", ") + " " + commands.usage : command.usage,true));
      // // }
      // helpEmbed.addField('Specific Commands',`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`,true);

      
      return msg.channel
        .send(helpEmbed)//, { split: true })
        .then(() => {
          // if (msg.channel.type === "dm") return;
          // msg.reply("I've sent you a DM with all my commands!");
        })
        .catch(error => {
          // console.error(
          //   `Could not send help DM to ${msg.author.tag}.\n`,
          //   error
          // );
          // msg.reply(
          //   "it seems like I can't DM you! Do you have DMs disabled?"
          // );
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
      .setColor("#fdfdfd")
      .setTitle(`**Name:** ${command.name}`)
    	.setFooter(msg.author.tag,msg.author.displayAvatarURL())
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
