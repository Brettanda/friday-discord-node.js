const Discord = require("discord.js");

var func = require("../functions");

const { soups, prefix, delMSGtimeout, typingTime } = require("../config.json");

// Load our training data
const trainingData = func.parseTrainingData("./chatModel.json");

const NLP = require("natural");
// Create a new classifier to train
const classifier = new NLP.LogisticRegressionClassifier();

var i = 0;
Object.keys(trainingData).forEach(elementContext => {
  const data = trainingData[elementContext].questions == undefined ? trainingData[elementContext] : trainingData[elementContext].questions;
  func.trainClassifier(classifier, elementContext, data);
  i++;
  if (i === Object.keys(trainingData).length) {
    i = 0;
    classifier.train();
    const filePath = "./classifier.json";
    classifier.save(filePath, (err) => {
      if (err) {
        console.error(err);
      }
      // console.info("Created a Classifier file in ", filePath);
    });
  }
});

module.exports = function(msg, bot) {
  const content = msg.content.toLowerCase().replace(/[\']/, "");
  
  const noContext = ["greetings", "farewells", "meaning","aware"];

  msg.channel.messages.fetch({ limit: 2 }).then(item => {
    
    const interpretation = func.interpret(content.replace("friday", ""), classifier);

    if (interpretation.guess == null) return;
    
    if (!noContext.includes(interpretation.guess) && Array.from(item.filter(i => i.author.bot == true)).length < 1 && msg.mentions.has(bot.user) != true && content.includes("friday") != true && msg.channel.type != "dm") {
      return;
    } 

    console.info("guess: ",interpretation.guess);
    var data = (typeof trainingData[interpretation.guess].answer != "undefined" ? trainingData[interpretation.guess].answer : (typeof trainingData[interpretation.guess].answers != "undefined" ? trainingData[interpretation.guess].answers[func.random(0, trainingData[interpretation.guess].answers.length)] : (trainingData[interpretation.guess][func.random(0, trainingData[interpretation.guess].length)] ? trainingData[interpretation.guess][func.random(0, trainingData[interpretation.guess].length)] : "dynamic")))

    if (interpretation.guess && data !== "dynamic") {
      console.info("Found response");
      msg.channel.send(func.capitalize(data));
    } else if (data !== "dynamic") {
      console.info("Couldn't match phrase");
      // msg.reply('Sorry, I\'m not sure what you mean');
    }

    if(data != "dynamic") return;

    // // comebacks
    switch(interpretation.guess) {
      case "insults":
        const noU = new Discord.MessageEmbed()
          .setColor("#FFD700")
          .setTitle("No u!")
          .setImage("https://i.imgur.com/yXEiYQ4.png");
        msg.channel.send(noU);
        break;
      case "activities":
        msg.reply(`I am playing ${bot.user.presence}`);
        break;
      case "aware":
        msg.react("😅");
        break;
      case "souptime":
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
        break;
    }


  });

  if (msg.channel.type != "dm" && msg.guild.id != process.env.DEVGUILD) {
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
