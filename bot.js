// require("dotenv").config();
const { Client, Collection } = require("discord.js");
const bot = new Client();
// const team = new Discord.Team(bot,{});

const func = require("./functions");
const { prefix } = require("./config.json");

bot.commands = new Collection();
// const shard = new Shard()
const botCommands = require("./commands");
const botChat = require("./chat");

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}! Apart of ${bot.guilds.cache.size} guilds`);

  // if (process.env.NODE_ENV=="development") console.log("🚧 Development Setup 🚧");

  if (bot.shard.ids.includes(0)) func.chooseGame(bot);
});

if (!process.env.NODE_ENV == "development") require("./dbl")(bot);

bot.on("reconnecting", () => console.info("Reconnecting!"));

bot.on("disconnect", () => console.info("Disconnected!"));

process.on("unhandledRejection", error => {
  if (error.toString().includes("Error: FFmpeg/avconv not found!")) return;
  console.error("Unhandled promise rejection:", error);
  func.msgDev(`Unhandled promise rejection: ${error}`, bot, "log-errors");
});

bot.on("error", error => {
  console.error(error);
  func.msgDev(`**Error:** ${error}`, bot, "log-errors");
});

bot.on("shardError", error => {
  console.error("A websocket connection encountered an error:", error);
  func.msgDev(`**A websocket connection encountered an error:** ${error}`, bot, "log-errors");
});

bot.on("guildCreate", guild => {
  console.info(`I have been added to a new guild named: \`${guild.name}\` with ${guild.memberCount} members :)`);
  func.msgDev(`I have joined another guild, making the total ${bot.guilds.cache.size}`, bot, "guild-join");
  if (!guild.systemChannel) return;
  guild.systemChannel.send(
    `Thank you for inviting me to your server. My name is Friday, and I like to party. I will respond to some chats directed towards me and commands. To get started with commands type \`${prefix}help\`.\nAn example of something I will respond to is \`Hello Friday\` or \`@friday hello\`. At my current stage of development I am very chaotic, so if I do something I shouldn't have please use \`!issue\`. If something goes terribly wrong and you want it to stop, talk to my creator https://discord.gg/F8KUDwu`,
  );
});

bot.on("voiceStateUpdate", (oldState, newState) => {
  // if(Array.from(newState.channel.members).length == 1)

  if (newState.member && newState.member.user.id != bot.user.id) return;

  if (!newState.connection) {
    const audioQueue = require("./commands/music/index").audioQueue;

    if (audioQueue.size == 0 || typeof audioQueue.size == undefined || !audioQueue.get(newState.guild.id)) return;

    audioQueue.delete(newState.guild.id);

    console.log("I was disconnected from a call and cleared the queue");
  } else if (newState.guild.afkChannelID == newState.channel.id) {
    // console.log("I was ")
  }
});

bot.on("guildDelete", () => {
  console.info("I have been removed from a guild");
  func.msgDev(`I have been removed from a guild, making the total ${bot.guilds.cache.size}`, bot, "guild-join");
});

// if (process.env.NODE_ENV=="development") bot.on("debug", console.log);

// I believe users are finding this anoyying
// bot.on("guildMemberAdd", member => {
//   if (!process.env.NODE_ENV=="development") {
//     member.send(
//       `Welcome **${member.displayName}** to **${member.guild.name}**.\nIt's great to have you :) I am a bot that help around the server. If you would like to chat with me in the future with one of my commands, just type \`${prefix}help\`.\nYou can also talk to me just by saying something like \`Hello Friday\`.`
//     ).catch(err => {/*console.error("Could not send a welcome message to a user")*/})
//   }
// });

Object.keys(botCommands).map(key => bot.commands.set(botCommands[key].name, botCommands[key]));

// console.log()//.map(com => botCommands[com].aliases).filter(item => item != undefined).map(item => item.join(", ")));
// var coms = Object.keys(botCommands).map(com => botCommands[com].name);

bot.on("message", async msg => {
  try {
    // If in development don't respond to messages outside of the dev guild
    // if (process.env.NODE_ENV=="development") {
    //   if (msg.guild.id != process.env.DEVGUILD) return;
    // }
    // else if (msg.guild && msg.guild.id == process.env.DEVGUILD) {
    //   return;
    // }

    if (msg.cleanContent.includes("process.exit()")) return msg.react("😡");

    // Im going to talk to another bot or me lol
    if (msg.author.bot || msg.system) return;

    // If the message exceeds the character limit for a message to a bot
    if (msg.cleanContent.length > 256) return console.error("message exceeds 256 characters");

    // If this happened then something horrible has gone down
    if (msg.guild == null && msg.channel.type != "dm") return func.msgDev("Check Glitch, a message didn't have a guild and wasn't a DM.", bot, "log-errors");

    if (msg.guild && require("./autoSettings.json").dontMessageServers.includes(msg.guild.id)) return;

    // Im not going to bother important channels
    if (msg.channel.type == "store" || msg.channel.type == "voice" || msg.channel.type == "category" || msg.channel.type == "news") return;

    if (require("./chat/ignoreText")(msg) == true) return console.log(`Ignored message: "${msg.content}"`);

    if (msg.channel.type != "dm") {
      const chatPerms = await msg.channel.permissionsFor(msg.client.user);
      if (!chatPerms.has("SEND_MESSAGES")) return;
    }

    if (!msg.content.startsWith(prefix)) return await botChat(msg, bot);

    if (msg.content == prefix) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${msg.cleanContent}`);

    if (!bot.commands.get(command) && !bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) {
      if (msg.channel.type != "dm") await msg.delete({ timeout: 100, reason: "Command" }).catch(err => console.error("Failed to delete the command from a user"));
      return await msg.channel.send(
        func.embed({
          title: `\`${prefix + command}\` is not a valid command`,
          author: msg.author,
        }),
      );
    }

    if (
      (bot.commands.get(command) && bot.commands.get(command).owner) ||
      (bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command)) && bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command)).owner)
    ) {
      if (process.env.DEVID != msg.author.id) {
        if (msg.channel.type != "dm") msg.delete({ timeout: 100, reason: "Command" }).catch(err => console.error("Failed to remove a users message"));
        return msg.channel.send(func.embed({ title: "You found one of my secret commands", description: "Only the owner of the bot can run this command" }));
      }
    }

    try {
      bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
        ? await bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command)).execute(msg, args, bot, command)
        : await bot.commands.get(command).execute(msg, args, bot, command);
    } catch (error) {
      console.error(error);
      if (!process.env.NODE_ENV == "development") func.msgDev(error, bot, (chat = "log-errors"));
      msg.channel.send(
        func.embed({
          title: `There was an error trying to execute \`${msg.cleanContent}\``,
          author: msg.author,
        }),
      );
    }

    if (msg.channel.type != "dm") return msg.delete({ timeout: 100, reason: "Command" }).catch(err => console.error("Failed to delete a users command"));
  } catch (err) {
    console.error(err);
  }
});

if (!process.env.NODE_ENV == "development") bot.login(process.env.TOKEN);
else bot.login(process.env.TOKENTEST);
