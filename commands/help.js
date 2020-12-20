const Discord = require("discord.js");
const func = require("../functions");

module.exports = {
  name: "help",
  hidden: true,
  description: "Lists all of my commands or info about a specific command.",
  aliases: ["commands", "?", "h"],
  usage: "[command name]",
  // cooldown: 5,
  execute(msg, args, bot, c, prefix) {
    const data = [];
    const { commands } = msg.client;

    if (!args.length) {
      const coms = commands.filter(com => !com.hidden);
      const helpEmbed = new Discord.MessageEmbed()
        .setColor("#fdfdfd")
        .setTitle("Friday - Help")
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription("If you would like to make a suggestion for a command please join the Friday Discord and explain your suggestion. Here's a list of all my commands:");
      // .setDescription(`If you would like to make a suggestion for a command please join the Friday Discord and explain your suggestion. Here's a list of all my commands:\n${coms.map(command => )}`)
      // .addField(
      //   `${coms.map(command => (!command.hidden ? `${command.name} or ${command.aliases ? command.aliases.join(", ") : ""}` : "")).join("\n")}`,
      //   `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`,
      //   true,
      // )
      // .setFooter(`You can send \`${prefix}help [command name]\` to get info on a specific command!\n${msg.author.username}`, msg.author.displayAvatarURL());

      const categories = { general: [] };
      coms.map(com => {
        // helpEmbed.addField(com.name,`${com.aliases ? `Aliases: ${com.aliases.join(", ")}\n`:``}Description: ${com.description}`,true)
        if (!categories[com.category ? com.category : "general"]) categories[com.category ? com.category : "general"] = [];
        categories[com.category ? com.category : "general"].push(com.name);
        // helpEmbed.addField(`${prefix}${com.name} ${com.aliases ? `, ${prefix}${com.aliases.join(", !")}\n` : ""}`, com.description, true);
      });
      Object.keys(categories).map(category => {
        helpEmbed.addField(`${func.capitalize(category)}`, `\`\`\`${prefix}${categories[category].join(`, ${prefix}`)}\`\`\``);
      });
      // // .addField("`" + commands.map(command => command.name).join("`, `") + "`",`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`,true)
      // console.info(commands.length);
      // // for(var i = 0;i<commands.length;i++) {
      // commands.map(command => helpEmbed.addField(command.name,command.aliases ? command.aliases.join(", ") + " " + commands.usage : command.usage,true));
      // // }
      // helpEmbed.addField('Specific Commands',`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`,true);

      return msg.channel
        .send(helpEmbed) //, { split: true })
        .then(t => {
          return require("../functions/settingsMngr").save(t);
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
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return msg.channel.send(
        func.embed({
          title: `\`${prefix + command}\` is not a valid command`,
          author: msg.author,
        }),
      );
    }

    const helpCom = new Discord.MessageEmbed().setColor("#fdfdfd").setTitle(`**Name:** ${command.name}`);
    // .setFooter(`Called by: ${msg.author.username}`, msg.author.displayAvatarURL());

    if (command.aliases) helpCom.addField("**Aliases:**", `${command.aliases.join(", ")}`);
    if (command.description) helpCom.addField("**Description:**", ` ${command.description}`);
    if (command.usage) helpCom.addField("**Usage:**", `${prefix}${command.name} ${command.usage}`);

    msg.channel.send(helpCom);
  },
};
