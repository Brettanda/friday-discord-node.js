const Discord = require("discord.js");

var func = require("../functions");

const { soups, prefix, delMSGtimeout, typingTime, unoCards } = require("../config.json");

// const fs = require("fs");

// Load our training data
// const trainingData = func.parseTrainingData("./chatModel.json");

// const NLP = require("natural");
// Create a new classifier to train
// const classifier = NLP.BayesClassifier.restore(func.parseTrainingData("./classifier.json"), null, function (err, classifier){});

// console.log(classifier)

module.exports = function(msg, bot) {
  const content = msg.content.toLowerCase().split(/[\'\"\`\,\.]/).join("");
  
  const noContext = ["Default Welcome Intent (Greetings)", "Title of your sex tape", "I dont want to talk to a chat bot", "Farewells", "The meaning of life?", "Birthday", "Memes", "Self Aware","Soup Time","No U"];
  
  // msg.channel.startTyping();
  msg.channel.messages.fetch({ limit: 2 }).then(item => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    if (pattern.test(content)) return;
    
    // const interpretation = func.interpret(content.split("friday").join(""), classifier);

    // console.info("guess guess:",interpretation.guess)

    // console.log("no spaces", content.split(" ").join("").split("friday").join(""));
    // if (content.split(" ").join("").split("friday").join("") == "  ") {
    //   msg.reply("How can I help?");
    //   return;
    // }

    // msg.channel.startTyping();
    func.queryDialogFlow(content,msg).then(async result => {
      
      if (result.intent.displayName == "Default Fallback Intent") {
        // await msg.channel.stopTyping(true);
        return;
      }
      
      // console.info("guess: ",interpretation.guess);
      // var trainingData = func.parseMovie().answers;
      // var data = (typeof trainingData[interpretation.guess].answer != "undefined" ? trainingData[interpretation.guess].answer : (typeof trainingData[interpretation.guess].answers != "undefined" ? trainingData[interpretation.guess].answers[func.random(0, trainingData[interpretation.guess].answers.length)] : (trainingData[interpretation.guess][func.random(0, trainingData[interpretation.guess].length)] ? trainingData[interpretation.guess][func.random(0, trainingData[interpretation.guess].length)] : "dynamic")))
      // var data = trainingData[interpretation.guess]
      if(
        !noContext.includes(result.intent.displayName) &&
        msg.mentions.has(bot.user) != true &&
        content.includes("friday") != true &&
        Array.from(item.filter(i => i.author.bot == true)).length < 1 &&
        msg.channel.type != "dm"
      ) return;
      
      if (result.fulfillmentText == "") {
        // await msg.channel.stopTyping(true);
        console.info("No response to send");
        return;
        // msg.reply('Sorry, I\'m not sure what you mean');
      }
      console.info("Found response");
      
      if(result.fulfillmentText != "dynamic") {
        await msg.channel.send(func.capitalize(result.fulfillmentText));
        // await msg.channel.stopTyping(true);
        return;
      }
  
      // comebacks
      switch (result.intent.displayName) {
        case "Insults":
          await msg.channel.send(func.embed("No u!", "#FFD700", "", msg.author, unoCards[func.random(0,unoCards.length)]));
          break;
        case "Activities":
          await msg.reply(`I am playing ${bot.user.presence.activities[0].name}`);
          break;
        case "Self Aware":
          await msg.react("😅");
          break;
        case "Creator":
          await bot.users.fetch(process.env.DEVID).then(member => {
            msg.channel.send(`${member.tag} is my creator :)`);
          });
          break;
        case "Soup Time":
          const image = soups[func.random(0,soups.length)];
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
          await msg.channel.send(func.embed("No u!", "#FFD700", "", msg.author, unoCards[func.random(0,unoCards.length)]));
          break;
        case "Memes" || "Memes - Another":
          await require('../commands/meme').execute(msg)
          break;
        case "Title of your sex tape":
          msg.channel.send(`*"${msg.content}"*, title of your sex-tape`);
          break;
          
      }
      // await msg.channel.stopTyping(true);
    }).catch(err => console.error(err));


  });

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
    msg.channel.send(func.embed("", "#FF8C00", "", msg.author,"https://media1.tenor.com/images/725176d9418345bf3a9b3699f2123a2a/tenor.gif"));
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

  if(content.match(/^r(e+)$/)) {
    msg.react("🇷");
    msg.react("🇪");
  }

  if (content.includes("bazinga")) {
    msg.channel
      .send("Banning " + msg.author.username + " in 10 seconds")
      .then(ban => {
        var timeLeft = 10;
        var count = setInterval(() => {
          timeLeft = timeLeft - 1;
          if (timeLeft <= 0) {
            ban.edit("Bazinga");
            clearInterval(count);
            return;
          }
          ban.edit(
            "Banning " + msg.author.username + " in " + timeLeft + " seconds"
          );
        }, 1000);
      });
  }

  if (content == "f" || content.includes("can i get an f")) {
    msg.channel.send("F");
  }

  if (content == "oof") {
    msg.react("😲");
  }

  if (
    content.includes("shit") ||
    content.includes("crap") ||
    content.includes("poop") ||
    content.includes("poo")
  ) {
    msg.react("💩");
  }

  if (content.includes("pupper")) {
    msg.react("🐕");
  }

  if (content == "it was me") {
    msg.channel.send("Dio");
  }

  if (content.includes("nani")) {
    msg.channel.send("Da fuck");
  }

  if (content.includes("neko")) {
    msg.react("😻");
  }

/*if (content.match(/\@everyone/)) {
  msg.reply('please use @here instead');
}*/
  
};
