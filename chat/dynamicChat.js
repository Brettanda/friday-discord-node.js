const { soups, unoCards } = require("../config.json");
const func = require("../functions");

module.exports = async (content, msg, bot, extra) => {
  switch (content) {
    case "Insults":
      await msg.react("😭");
      // await msg.channel.send(
      //   func.embed(
      //     "No u!",
      //     "#FFD700",
      //     "",
      //     msg.author,
      //     unoCards[func.random(0, unoCards.length)]
      //   )
      // );
      break;
    case "Activities":
      await msg.reply(`I am playing ${bot.user.presence.activities[0].name}`);
      break;
    case "Self Aware":
      await msg.react("👀");
      break;
    case "Creator":
      await bot.users.fetch(process.env.DEVID).then((member) => {
        msg.channel.send(`${member.tag} is my creator :)`);
      });
      break;
    case "Soup Time":
      const image = soups[func.random(0, soups.length)];
      console.info(`Soup: ${image}`);

      await msg.channel.send(
        func.embed(
          "It's time for soup, just for you " + msg.author.username,
          "#FFD700",
          "I hope you enjoy, I made it myself :)",
          msg.author,
          image
        )
      );
      break;
    case "Stop":
      await msg.react("😅");
      break;
    case "No U":
      await msg.channel.send(
        func.embed("No u!", "#FFD700", "", msg.author, unoCards[func.random(0, unoCards.length)])
      );
      break;
    case "Memes":
    case "Memes - Another":
      await require("../commands/meme").execute(msg);
      break;
    case "Title of your sex tape":
      msg.channel.send(`*"${func.capitalize(msg.cleanContent)}"*, title of your sex-tape`);
      break;
    case "show me something cute":
      if(extra) await msg.reply(extra)
      await require("../commands/smile").execute(msg);
      break;
    case "Something cool":
      await require("../commands/meme").execute(msg, "cool");
      break;
    case "Compliments":
    case "Thanks":
    case "are you a bot?":
    case "I love you":
      const hearts = ["❤️", "💯", "💕"];
      await msg.react(hearts[func.random(0, hearts.length)]);
      break;
    case "give me 5 minutes":
      const clocks = ["⏰", "⌚", "🕰", "⏱"];
      await msg.react(clocks[func.random(0, clocks.length)]);
      break;
  }
};
