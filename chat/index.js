const {
  greetings,
  thanks,
  welcomes,
  farewells,
  insults,
  soups
} = require("../config.json");
const Discord = require("discord.js");
var func = require("../functions/index.js");

module.exports = function(msg) {
  const content = msg.content.toLowerCase();

  // greetings
  if (greetings.includes(content)) {
    const reply =
      greetings[func.random(0,greetings.length)];
    msg.reply(func.capitalize(reply));
  }

  // thanks 
  thanks.forEach(item => {
    if (content.includes(item) && content.includes("friday")) {
      const reply =
        welcomes[func.random(0,welcomes.length)];
      msg.react("😘");
      msg.reply(func.capitalize(reply));
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
      const reply =
        farewells[func.random(0,farewells.length)];
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
  if (content.includes("no u") || content.includes("no you") || content.includes("nou")) {
    const noU = new Discord.MessageEmbed()
    .setColor("#FFD700")
    .setTitle("No u!")
    .setImage("https://i.imgur.com/yXEiYQ4.png");
    msg.channel.send(noU);
  }
  
  if(content.includes("I like you") && content.includes("friday")) {
    msg.reply("I like you too");
  } 
  
  if(content.includes("what time is it") || content.includes("what's the time")) {
    var num = Math.floor(Math.random() * (+soups.length - +0) + +0);
    var image = soups[num];

    const imageEmbed = new Discord.MessageEmbed()
      .setColor("#FFD700")
      .setTitle("It is time for soup, just for you " + msg.author.username)
      // .setAuthor("@"+msg.author.username, msg.author.displayAvatarURL())
      .setDescription("I hope you enjoy!")
      .setImage(image)
      .setTimestamp();

    msg.channel.send(imageEmbed);
  }
  
  if(content.includes("stop") || content.includes("friday")) {
    msg.react("😅");
  } 
  
  if(content.includes("bazinga")) {
    msg.channel.send("Banning " + msg.author.username + " in 10 seconds")
    .then(ban => {
      var timeLeft = 10;
  		var count = setInterval(() => {
        timeLeft = timeLeft - 1;
        if(timeLeft <= 0) {ban.edit("Bazinga");clearInterval(count);return;} 
        ban.edit("Banning " + msg.author.username + " in " + timeLeft + " seconds");
      },1000);
    });
  	
  } 

  /*if (content.match(/\@everyone/)) {
    msg.reply('please use @here instead');
  }*/
};
