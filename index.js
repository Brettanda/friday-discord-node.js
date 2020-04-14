require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const { prefix, token, games } = require("./config.json");

bot.commands = new Discord.Collection();
const botCommands = require("./commands");
const botVoice    = require("./voice");
const botChat     = require("./chat");
// const {botChat} = require("./chat");

bot.login(token);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);

  bot.user.setActivity("🚧Under Construction");
  // chooseGame(bot);
});

function chooseGame() {
  var num = Math.floor(Math.random() * (+games.length - +0) + +0);
  var game = games[num];
  bot.user.setActivity(game);

  setTimeout(chooseGame, 43200);
}

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

Object.keys(botVoice).map(key => {
  bot.commands.set(botVoice[key].name, botVoice[key]);
});

bot.on("message", msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) {console.info("message not chat or command");return};

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
      : bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});
