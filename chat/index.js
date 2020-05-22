const Discord = require("discord.js");

var func = require("../functions");

const { prefix, delMSGtimeout, typingTime } = require("../config.json");

// const fs = require("fs");

// Load our training data
// const trainingData = func.parseTrainingData("./chatModel.json");

// const NLP = require("natural");
// Create a new classifier to train
// const classifier = NLP.BayesClassifier.restore(func.parseTrainingData("./classifier.json"), null, function (err, classifier){});

// console.log(classifier)

module.exports = async (msg, bot) => {
  const content = msg.cleanContent
    .toLowerCase()
    .split(/[\'\"\`\,\.]/)
    .join("");

  if (
    Array.from(msg.attachments).length >= 1 &&
    (msg.content == null ||
      typeof msg.content == "undefined" ||
      msg.content == "")
  ) {
    console.log("Image");
    return;
  }

  // if ((await require("./spamstream")) == true) {
  //   console.log("spamstream");
  //   return;
  // } else console.log("spamstream failed");

  const noContext = [
    "Default Welcome Intent (Greetings)",
    "Title of your sex tape",
    "I dont want to talk to a chat bot",
    "Farewells",
    "The meaning of life?",
    "Birthday",
    "Memes",
    "Self Aware",
    "Soup Time",
    "No U"
  ];

  // msg.channel.startTyping();

  const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; // fragment locator

  if (pattern.test(msg.cleanContent)) {
    console.log("url");
    return;
  }

  const query = func.queryDialogFlow(content, msg);

  msg.channel.messages.fetch({ limit: 2 }).then(item => {
    // const interpretation = func.interpret(content.split("friday").join(""), classifier);

    // console.info("guess guess:",interpretation.guess)

    // console.log("no spaces", content.split(" ").join("").split("friday").join(""));
    // if (content.split(" ").join("").split("friday").join("") == "  ") {
    //   msg.reply("How can I help?");
    //   return;
    // }

    // msg.channel.startTyping();
    query
      .then(async result => {
        if (result.intent.displayName == "Default Fallback Intent") {
          // await msg.channel.stopTyping(true);
          return;
        }

        // console.info("guess: ",interpretation.guess);
        // var trainingData = func.parseMovie().answers;
        // var data = (typeof trainingData[interpretation.guess].answer != "undefined" ? trainingData[interpretation.guess].answer : (typeof trainingData[interpretation.guess].answers != "undefined" ? trainingData[interpretation.guess].answers[func.random(0, trainingData[interpretation.guess].answers.length)] : (trainingData[interpretation.guess][func.random(0, trainingData[interpretation.guess].length)] ? trainingData[interpretation.guess][func.random(0, trainingData[interpretation.guess].length)] : "dynamic")))
        // var data = trainingData[interpretation.guess]
        if (
          !noContext.includes(result.intent.displayName) &&
          msg.mentions.has(bot.user) != true &&
          content.includes("friday") != true &&
          Array.from(item.filter(i => i.author.bot == true)).length < 1 &&
          msg.channel.type != "dm"
        )
          return;

        if (result.fulfillmentText == "") {
          // await msg.channel.stopTyping(true);
          console.info("No response to send");
          return;
          // msg.reply('Sorry, I\'m not sure what you mean');
        }
        console.info("Found response");

        if (result.fulfillmentText != "dynamic") {
          await msg.channel.send(func.capitalize(result.fulfillmentText));
          // await msg.channel.stopTyping(true);
          return;
        }

        await require("./dynamicChat")(result.intent.displayName, msg, bot);

        // await msg.channel.stopTyping(true);
      })
      .catch(err => console.error(err));
  });

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
    msg.channel.send(
      func.embed(
        "",
        "#FF8C00",
        "",
        msg.author,
        "https://media1.tenor.com/images/725176d9418345bf3a9b3699f2123a2a/tenor.gif"
      )
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

  if (content.match(/^o+f$/)) {
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
