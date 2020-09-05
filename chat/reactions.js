const func = require("../functions");

const { /*prefix, delMSGtimeout, typingTime, */ theGame } = require("../config.json");

module.exports = async (content, msg) => {
  // if (msg.author.lastMessage.cleanContent == msg.cleanContent && msg.guild) {
  //   console.info(
  //     `Spam detected on \`${msg.guild.name} - ${msg.channel.name}\``
  //   );
  // }

  // if (msg.channel.type != "dm" && msg.guild.id == process.env.DEVGUILD) {
  //   msg.channel.messages.fetch({ limit: 3 }).then(item => {
  //     const msgs = item.map(i => i);
  //     var conts = item.map(i => i.content);
  //     const reply =
  //       "Don't spam please. If this is not spam please use `" +
  //       prefix +
  //       "issue`";
  //     conts = conts.filter(i => i != reply);
  //     if (func.hasDups(conts) == true) {
  //       if (
  //         msgs.filter(i => i.author.id == bot.user.id && i.content == reply)
  //           .length > 0
  //       ) {
  //         msg.delete(0,"Message: `"+msg.content+"` Spam, hopfully");
  //         return;
  //       }
  //       msg.delete().catch(err => console.error(err));
  //       msg.channel.send(reply)/*.then(status => {
  //         setTimeout(() => {
  //           status.delete();
  //         }, delMSGtimeout);
  //       })*/;
  //     }
  //   }).catch(err => console.error(err));
  // }

  // the game
  if (content.includes("the game") || content.includes("thegame")) {
    return msg.channel.send(
      func.embed({
        color: "#FF8C00",
        author: msg.author,
        image: theGame[func.random(0, theGame.length)],
      })
    );
  }

  // no u
  // if (
  //   content.includes("no u") ||
  //   content.includes("no you") ||
  //   content.includes("nou")
  // ) {
  //   msg.channel.send(func.embed("No u!", "#FFD700", "", msg.author,unoCards[func.random(0,unoCards.length)]));
  // }

  // if (content.includes("I like you") && content.includes("friday")) {
  //   msg.reply("I like you too");
  // }

  // if (content.includes("can i get") && content.includes("soup")) {
  //   const num = func.random(0, soups.length);
  //   const image = soups[num];

  //   msg.channel.send(
  //     func.embed(
  //       "As you wish, " + msg.author.username,
  //       "#ffd700",
  //       "I hope you enjoy",
  //       msg.author,
  //       image
  //     )
  //   );
  // }

  // if (content.includes("stop") && content.includes("friday")) {
  //   msg.react("😅");
  // }

  if (content.match(/^r(e+)$/)) {
    await msg.react("🇷");
    await msg.react("🇪");
  }

  // if(content.includes("@someone")) {
  //   // console.log("Max: " + msg.guild.memberCount + " " + func.random(0,msg.guild.memberCount))
  //   msg.channel.messages.fetch({ limit: 10 }).then(async item => {
  //     if(Array.from(item).filter(i => i[1].content.includes("@someone") && i[1].author == msg.author).length > 0) return msg.reply("You have already used that recently. Try again later :)")

  //     let user = Array.from(msg.guild.members.cache)[func.random(0,msg.guild.memberCount)][1].user;
  //     msg.channel.send("<@!"+user.id+">");
  //   });
  // }

  if (content.includes("@here") || content.includes("@everyone")) {
    const ping = ["🤔"];
    msg.react(ping[func.random(0, ping.length)]);
  }

  if (content.includes("bazinga")) {
    return await msg.channel.send(`Banning ${msg.author.username} from \`${msg.guild.name}\` in 10 seconds`).then((ban) => {
      var timeLeft = 10;
      var count = setInterval(() => {
        timeLeft = timeLeft - 1;
        if (timeLeft <= 0) {
          ban.edit("Bazinga");
          clearInterval(count);
          return;
        }
        ban.edit(`Banning ${msg.author.username} from \`${msg.guild.name}\` in ${timeLeft} seconds`);
      }, 1000);
    });
  }

  if (content == "f" || content.includes("can i get an f")) {
    // msg.channel.send("F");
    return await msg.react("🇫");
  }

  if (content.match(/^o+f$/)) {
    return await msg.react("😲");
  }

  if (content.includes("shit") || content.includes("shît") || content.includes("crap") || content.includes("poop") || content.includes("poo")) {
    return await msg.react("💩");
  }

  if (content.includes("monkey") || content.includes("munky") || content.includes("manky") || content.includes("menky")) {
    if (func.random(0, 1) == 1) return await msg.react("🐒");
    else return await msg.react("🐵");
  }

  if (content.includes("pupper") || content.includes("dog")) return await msg.react("🐕");

  if (content == "it was me") return await msg.channel.send("Dio");

  if (content.includes("nani")) return await msg.channel.send("Da fuck");

  /*if (content.match(/\@everyone/)) {
  msg.reply('please use @here instead');
}*/
};
