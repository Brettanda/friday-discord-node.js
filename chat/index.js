const func = require("../functions");

// const { prefix, delMSGtimeout, typingTime, theGame } = require("../config.json");


// const fs = require("fs");

// Load our training data
// const trainingData = func.parseTrainingData("./chatModel.json");

// const NLP = require("natural");
// Create a new classifier to train
// const classifier = NLP.BayesClassifier.restore(func.parseTrainingData("./classifier.json"), null, function (err, classifier){});

// console.log(classifier)

module.exports = async (msg, bot) => {
  const content = await msg.cleanContent
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

//   const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; // fragment locator

//   if (pattern.test(msg.cleanContent)) {
//     console.log("url");
//     return;
//   }
  if(await require('./reposts')(msg,bot)) return;
  // const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; // fragment locator
  // if(pattern.test(msg.cleanContent)) return;

  await require('./reactions')(content,msg)

  // const query = await func.queryDialogFlow(content, msg);
      // talkingAboutAnotherBot,
    // talkingAboutMe;
  //   pastFiveMSGS = msg.channel.messages.fetch({limit: 5}).then(item => {
  //   talkingAboutAnotherBot = Array.from(item.filter(message => message.author.bot == true && message.author.id != bot.user.id)).length
  //   talkingAboutMe = Array.from(item.filter(message => message.author.id == bot.user.id)).length
    
  //   console.log(talkingAboutAnotherBot)
  //   console.log(talkingAboutMe)
  // });


  await msg.channel.messages.fetch({ limit: 3 }).then(async item => {
    // const interpretation = func.interpret(content.split("friday").join(""), classifier);

    // console.info("guess guess:",interpretation.guess)

    // console.log("no spaces", content.split(" ").join("").split("friday").join(""));
    // if (content.split(" ").join("").split("friday").join("") == "  ") {
    //   msg.reply("How can I help?");
    //   return;
    // }

    // msg.channel.startTyping();
    await func.queryDialogFlow(content, msg)
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
          // Array.from(item.filter(i => i.author.bot == true)).length < 1 &&
          content.includes("bot") != true &&
          // TODO: add a check for another bot 
          Array.from(item.filter(i => i.author.id == bot.user.id)).length == 0 &&
          msg.channel.type != "dm"
        )
          return console.log("Not replying to this message");

        if (result.fulfillmentText == "") {
          // await msg.channel.stopTyping(true);
          console.info("No response to send");
          return;
          // msg.reply('Sorry, I\'m not sure what you mean');
        }
        console.info("Found response");

        if (result.fulfillmentText != "dynamic") {
          await msg.channel.send(await func.capitalize(result.fulfillmentText));
          // await msg.channel.stopTyping(true);
          return;
        }

        await require("./dynamicChat")(result.intent.displayName, msg, bot);

        // await msg.channel.stopTyping(true);
      })
      .catch(err => console.error(err));
  });
};
