require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
// const team = new Discord.Team(bot,{});

const func = require("./functions");
const { prefix, games, typingTime } = require("./config.json");

bot.commands = new Discord.Collection();
const botCommands = require("./commands");
const botChat = require("./chat");

bot.login(process.env.TOKEN);

bot.on("ready", () => {
  console.info(
    `Logged in as ${bot.user.tag}! Apart of ${bot.guilds.cache.size} guilds`
  );

  if (process.argv.includes("--dev")) console.log("Development Setup");

  //bot.user.setActivity("🚧Under Construction");
  if (!process.argv.includes("--dev")) func.chooseGame(bot); 
});

bot.on("reconnecting", () => {
  console.info("Reconnecting!");
});

bot.on("disconnect", () => {
  console.info("Disconnected!");
});

// bot.on('debug', console.log);
bot.on("error", error => {
  if (!process.argv.includes("--dev")) {
    Array.from(bot.guilds.cache)
      .filter(item => item[0] == process.env.SUPPORTGUILD)[0][1]
      .channels.cache.find(channel => channel.name == "log-errors")
      .send(`**Error:** ${error}`);
  }
});

bot.on("shardError", error => {
  console.error("A websocket connection encountered an error:", error);
});

bot.on("guildCreate", async guild => {
  if (!process.argv.includes("--dev")) {
    console.info("I have been added to a new guild :)");
    if (!guild.systemChannel) return;
    await guild.systemChannel.send(
      `Thank you for inviting me to your server. My name is Friday, and I like to party. I will respond to some chats directed towards me and commands. To get started with commands type \`${prefix}help\`.\nAn example of something I will respond to is \`Hey\` or \`Hello Friday\`. At my current stage of development I am very chaotic, so if I do something I shouldn't have please use \`!issue\`. If something goes terribly wrong and you want it to stop, talk to my creator https://discord.gg/F8KUDwu`
    );
    await Array.from(bot.guilds.cache)
      .filter(item => item[0] == process.env.SUPPORTGUILD)[0][1]
      .channels.cache.find(channel => channel.name == "guild-join")
      .send(
        `I have joined another guild, making the total ${bot.guilds.cache.size}`
      );
  }
});

bot.on("guildDelete", guild => {
  if (!process.argv.includes("--dev")) {
    func.msgDev(`I have been removed from a guild, making the total ${bot.guilds.cache.size}`,chat = "guild-join")
    // Array.from(bot.guilds.cache)
    //   .filter(item => item[0] == process.env.SUPPORTGUILD)[0][1]
    //   .channels.cache.find(channel => channel.name == "guild-join")
    //   .send(
    //     `I have been removed from a guild, making the total ${bot.guilds.cache.size}`
    //   );
  }
});

bot.on("guildMemberAdd", member => {
  if (!process.argv.includes("--dev")) {
    member.send(
      `Welcome **${member.displayName}** to **${member.guild.name}**.\nIt's great to have you :) I am a bot that help around the server. If you would like to chat with me in the future with one of my commands, just type \`${prefix}help\`.\nYou can also talk to me just by saying something like \`Hello Friday\`.`
    ).catch(err => {/*console.error("Could not send a welcome message to a user")*/})
  }
});

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

// console.log()//.map(com => botCommands[com].aliases).filter(item => item != undefined).map(item => item.join(", ")));
// var coms = Object.keys(botCommands).map(com => botCommands[com].name);

bot.on("message", async msg => {
  try {
    // Im going to talk to another bot or me lol
    if (msg.author.bot) return;

    // If the message exceeds the character limit for a message to a bot
    if(msg.cleanContent.length > 256) return console.error("message exceeds 256 characters");

    // If this happened then something horrible has gone down
    if (msg.guild == null && msg.channel.type != "dm") {
      return await func.msgDev("Check Glitch, a message didn't have a guild and wasn't a DM.",bot,"log-errors");
    }

    // Im not going to bother important channels
    if (
      msg.channel.type == "store" ||
      msg.channel.type == "voice" ||
      msg.channel.type == "category" ||
      msg.channel.type == "news"
    )
      return;

    // If in development don't respond to messages outside of the dev guild
    if (process.argv.includes("--dev")) {
      if (msg.channel.type == "dm") return;

      if (msg.guild.id != process.env.DEVGUILD) return;
    } else {
      if (msg.guild && msg.guild.id == process.env.DEVGUILD) return;
    }
    
    if(require("./chat/ignoreText")(msg).length > 0) {
      console.log(`Ignored message: "${msg.cleanContent}"`);
      return
    }
    
    if (!msg.content.startsWith(prefix)) return await botChat(msg, bot);

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${command}`);

    if (
      !bot.commands.get(command) &&
      !bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
    ) {
      if (msg.channel.type != "dm")
        await msg.delete({ timeout: 100, reason: "Command" }).catch(err => console.error("Failed to delete the command from a user"));
      return await msg.channel.send(
        `\`${prefix + command}\` is not a valid command`
      );
    }

    if (
      (bot.commands.get(command) && bot.commands.get(command).owner) ||
        (bot.commands.find(
          cmd => cmd.aliases && cmd.aliases.includes(command)
        ) && bot.commands.find(
          cmd => cmd.aliases && cmd.aliases.includes(command)
        ).owner)
    ) {
      if (process.env.DEVID != msg.author.id) {
        if (msg.channel.type != "dm")
          await msg.delete({ timeout: 100, reason: "Command" }).catch(err => console.error("Failed to remove a users message"));
        await msg.reply("Only the owner of the bot can run this command");
        return;
      }
    }

    try {
      bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
        ? bot.commands
            .find(cmd => cmd.aliases && cmd.aliases.includes(command))
            .execute(msg, args, bot, command)
        : bot.commands.get(command).execute(msg, args, bot, command);
    } catch (error) {
      console.error(error);
      await func.msgDev(error,chat = "log-errors");
      await msg.reply("There was an error trying to execute that command!");
    }

    if (msg.channel.type != "dm")
      await msg.delete({ timeout: 100, reason: "Command" }).catch(err => console.error("Failed to delete a users command"));
  } catch (err) {
    console.error(err);
  }
});
