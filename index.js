require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
// const team = new Discord.Team(bot,{});
const { prefix, games, typingTime } = require("./config.json");

bot.commands = new Discord.Collection();
const botCommands = require("./commands");
const botChat = require("./chat");

bot.login(process.env.TOKEN);

bot.on("ready", () => {
  console.info(
    `Logged in as ${bot.user.tag}! Apart of ${
      bot.guilds.cache.map(item => item.name).length
    } guilds`
  );

  if (process.argv.includes("--dev")) console.log("Development Setup");

  // console.info(Object.keys(bot.guilds).length);
  // console.info(bot.guilds.cache.map(item => item.name).join(" -- "));

  //bot.user.setActivity("🚧Under Construction");
  chooseGame(bot);
});

bot.on("reconnecting", () => {
  console.info("Reconnecting!");
});

bot.on("disconnect", () => {
  console.info("Disconnect!");
});

bot.on("guildCreate", guild => {
  console.info("I have been added to a new guild :)");
  if (!guild.systemChannel) return;
  guild.systemChannel.send(`Thank you for inviting me to your server. My name is Friday, and I like to party. I will respond to some chats directed towards me and commands. To get started with commands type \`${prefix}help\`.\nAn example of something I will respond to is \`Hey\` or \`Hello Friday\``);
});

bot.on("guildDelete", guild => {
  console.info(`I have been remove from a guild :'(`);
});

function chooseGame() {
  const num = Math.floor(Math.random() * (+games.length - +0) + +0);
  const game = games[num];
  bot.user.setActivity(game, { type: "PLAYING" });
  // console.info("Currently playing: " + game);

  setInterval(chooseGame, 1800000);
}

bot.on("guildMemberAdd", member => {
  member.send(`Welcome **${member.displayName}** to **${member.guild.name}**.\nIt's great to have you :) I am a bot that help around the server. If you would like to chat with me in the future with one of my commands, just type \`${prefix}help\`.\nYou can also talk to me just by saying something like \`Hello Friday\`.`);
});

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

// console.log()//.map(com => botCommands[com].aliases).filter(item => item != undefined).map(item => item.join(", ")));
// var coms = Object.keys(botCommands).map(com => botCommands[com].name);

bot.on("message", msg => {
  // If this happened then something horrible has gone down
  if (msg.guild == null && msg.channel.type != "dm") {
    bot.users.fetch(process.env.DEVID).then(member => {
      member.send("Check Glitch, a message didn't have a guild and wasn't a DM.");
    }).catch(err => console.error(err));
    return;
  }

  // Im not going to bother important channels
  if(msg.channel.type == "store" || msg.channel.type == "voice" || msg.channel.type == "category" || msg.channel.type == "news") return;

  // Im going to talk to another bot or me lol
  if(msg.author.bot) return;

  // If in development don't respond to messages outside of the dev guild
  if (process.argv.includes('--dev')) {
    if(msg.channel.type == "dm") return;

    if (msg.guild.id != process.env.DEVGUILD) return;
  } else {
    if (msg.guild.id == process.env.DEVGUILD) return;
  }

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
    // if (!spellcheck.isCorrect(command) && bot.commands.get(spellcheck.getCorrections(command, 2)[0])) {
      // msg.reply("I think you mean't `" + prefix + spellcheck.getCorrections(command, 2)[0]+"`");
      // command = spellcheck.getCorrections(command, 2)[0];
      // return;
    // } else {
      msg.channel.send("That command could not be found");
      return;
    // }
  }

  try {
    bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
      ? bot.commands
          .find(cmd => cmd.aliases && cmd.aliases.includes(command))
          .execute(msg, args,bot)
      : bot.commands.get(command).execute(msg, args, bot);
  } catch (error) {
    console.error(error);
    msg.reply("There was an error trying to execute that command!");
  }

  if(msg.channel.type != "dm") msg.delete({timeout:0,reason:"Command"});
});
