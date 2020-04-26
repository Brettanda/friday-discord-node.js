const Discord = require("discord.js");

var func = require("../functions");

const { greetings, thanks, farewells, insults } = require("../chatModel.json");
const { soups, prefix, delMSGtimeout, typingTime } = require("../config.json");

// Load our training data
const trainingData = func.parseTrainingData("./chatModel.json");

const NLP = require("natural");
// Create a new classifier to train
const classifier = new NLP.LogisticRegressionClassifier();

function interpret(phrase) {
  console.log("interpret", phrase);
  console.log(classifier.getClassifications(phrase.toLowerCase()));
  const guesses = classifier.getClassifications(phrase.toLowerCase());
  console.log("guesses", guesses);
  const guess = guesses.reduce((x, y) => (x && x.value > y.value ? x : y));
  return {
    probabilities: guesses,
    guess: guess.value > 0.7 ? guess.label : null
  };
}

module.exports = function(msg, bot) {
  const content = msg.content.toLowerCase().replace(/[\']/, "");

  try {
    //     const interpretation = interpret(content);
    //     console.info(interpretation.guess);

    //     if (interpretation.guess && trainingData[interpretation.guess]) {
    //       console.info("Found response");
    //       // speech.reply(message, trainingData[interpretation.guess].answer);
    //     } else {
    //       console.info("Couldn't match phrase");
    //       // speech.reply(message, 'Sorry, I\'m not sure what you mean');
    //     }

    var i = 0;
    Object.keys(trainingData).forEach((element, key) => {
      const data = trainingData[element].questions == undefined ? trainingData[element] : trainingData[element].questions;
      func.trainClassifier(classifier, element, data);
      i++;
      if (i === Object.keys(trainingData).length) {
        classifier.train();
        const filePath = "./classifier.json";
        classifier.save(filePath, (err, classifier) => {
          if (err) {
            console.error(err);
          }
          console.info("Created a Classifier file in ", filePath);
        });
      }
    });
  } catch (err) {
    console.error(err);
  }

  if (msg.guild.id != process.env.devguild && msg.channel.type != "dm") {
    msg.channel.messages.fetch({ limit: 3 }).then(item => {
      const msgs = item.map(i => i);
      var conts = item.map(i => i.content);
      const reply =
        "Don't spam please. If this is not spam please use `" +
        prefix +
        "issue`";
      conts = conts.filter(i => i != reply);
      if (func.hasDups(conts) == true) {
        if (
          msgs.filter(i => i.author.id == bot.user.id && i.content == reply)
            .length > 0
        ) {
          msg.delete();
          return;
        }
        msg.delete();
        msg.channel.send(reply).then(status => {
          setTimeout(() => {
            status.delete();
          }, delMSGtimeout);
        });
      }
    });
  }

  // greetings
  if (greetings.includes(content)) {
    const reply = greetings[func.random(0, greetings.length)];
    msg.channel.startTyping();
    setTimeout(() => {
      msg.channel.stopTyping(true);
      msg.reply(func.capitalize(reply));
    }, typingTime);
  }
  // greetings.forEach(item => {
  //   if (content.includes(item)) {
  //     const reply = greetings[func.random(0, greetings.length)];
  //     msg.reply(func.capitalize(reply));
  //   }
  // });

  // thanks
  var stop = false;
  thanks.questions.forEach(item => {
    if (content.includes(item) && content.includes("friday") && stop == false) {
      const reply = thanks.answers[func.random(0, thanks.answers.length)];
      msg.react("😘");
      msg.reply(func.capitalize(reply));
      stop = true;
    }
  });

  // comebacks
  insults.forEach(item => {
    if (content.includes(item) && content.includes("friday")) {
      //https://i.imgur.com/yXEiYQ4.png
      const noU = new Discord.MessageEmbed()
        .setColor("#FFD700")
        .setTitle("No u!")
        .setImage("https://i.imgur.com/yXEiYQ4.png");
      msg.channel.send(noU);
    }
  });

  // farewells
  farewells.forEach(item => {
    if (content.includes(item)) {
      const reply = farewells[func.random(0, farewells.length)];
      msg.reply(func.capitalize(reply));
    }
  });

  // the game
  if (content.includes("the game") || content.includes("thegame")) {
    const game = new Discord.MessageEmbed()
      .setColor("#ff8c00")
      .setImage(
        "https://media1.tenor.com/images/725176d9418345bf3a9b3699f2123a2a/tenor.gif"
      );
    msg.channel.send(game);
  }

  // no u
  if (
    content.includes("no u") ||
    content.includes("no you") ||
    content.includes("nou")
  ) {
    const noU = new Discord.MessageEmbed()
      .setColor("#FFD700")
      .setTitle("No u!")
      .setImage("https://i.imgur.com/yXEiYQ4.png");
    msg.channel.send(noU);
  }

  if (content.includes("I like you") && content.includes("friday")) {
    msg.reply("I like you too");
  }

  if (
    content.includes("what time is it") ||
    content.includes("whats the time")
  ) {
    const num = Math.floor(Math.random() * (+soups.length - +0) + +0);
    const image = soups[num];

    msg.channel.send(
      func.embed(
        "It is time for soup, just for you " + msg.author.username,
        "#FFD700",
        "I hope you enjoy",
        msg.author,
        image
      )
    );
  }

  if (content.includes("can i get") && content.includes("soup")) {
    const num = func.random(0, soups.length);
    const image = soups[num];

    msg.channel.send(
      func.embed(
        "As you wish, " + msg.author.username,
        "#ffd700",
        "I hope you enjoy",
        msg.author,
        image
      )
    );
  }

  if (content.includes("stop") && content.includes("friday")) {
    msg.react("😅");
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

  if (content.includes("what is the meaning of life")) {
    msg.reply("42");
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

  if (content.includes("self aware") && !content.includes("friday")) {
    msg.react("😅");
  }

  if (content.includes("neko")) {
    msg.react("😻");
  }

  /*if (content.match(/\@everyone/)) {
    msg.reply('please use @here instead');
  }*/
};
