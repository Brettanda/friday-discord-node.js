require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const { prefix, games, typingTime } = require("./config.json");

bot.commands = new Discord.Collection();
const botCommands = require("./commands");
const botVoice = require("./voice");
const botChat = require("./chat");

bot.login(process.env.TOKEN);

bot.once("ready", () => {
  console.info(
    `Logged in as ${bot.user.tag}! Apart of ${
      bot.guilds.cache.map(item => item.name).length
    } guilds`
  );

  // console.info(Object.keys(bot.guilds).length);
  // console.info(bot.guilds.cache.map(item => item.name).join(" -- "));

  //bot.user.setActivity("🚧Under Construction");
  chooseGame(bot);
});

bot.once("reconnecting", () => {
  console.info("Reconnecting!");
});

bot.once("disconnect", () => {
  console.info("Disconnect!");
});

bot.once("guildCreate", guild => {
  console.log("I have been added to a new guild :)");
  if (!guild.systemChannel) return;
  guild.systemChannel.startTyping();
  setTimeout(() => {
    guild.systemChannel.send(
      "Thank you for inviting me to your server.\nMy name is Friday, and I like to party.\nI will respond to some chats directed towards me and commands. To get started with commands type `" +
        prefix +
        "help`.\nAn example of something I will respond to is `Hey` or `Hello Friday`"
    );
    guild.systemChannel.stopTyping(true);
  }, typingTime);
});

bot.once("guildDelete", guild => {
  console.log("I have been remove from a guild :'(");
});

function chooseGame() {
  const num = Math.floor(Math.random() * (+games.length - +0) + +0);
  const game = games[num];
  bot.user.setActivity(game, { type: "PLAYING" });
  // console.info("Currently playing: " + game);

  const choose = setInterval(chooseGame, 1800000);
}

bot.once("guildMemberAdd", member => {
  member.send(`Welcome to the server, ${member.username}. It's great to have you :) I am a bit that helps manage this server. If you would like to chat with me in the future with one of my commands, just type '${prefix}help'
`);
});

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

Object.keys(botVoice).map(key => {
  bot.commands.set(botVoice[key].name, botVoice[key]);
});

bot.on("message", msg => {
  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix)) {
    botChat(msg, bot);
    return;
  }

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (
    !bot.commands.get(command) &&
    !bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
  ) {
    msg.channel.send("That command could not be found");
    return;
  }

  try {
    bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
      ? bot.commands
          .find(cmd => cmd.aliases && cmd.aliases.includes(command))
          .execute(msg, args)
      : bot.commands.get(command).execute(msg, args, bot);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }

  msg.delete();
});
