const { soups } = require("../config.json");
const { embed } = require("../functions");
const Discord = require("discord.js");

module.exports = {
  name: "souptime",
  description: "Soup Time",
  execute(msg, args) {
    var num = Math.floor(Math.random() * (+soups.length - +0) + +0);
    var image = soups[num];

    // const imageEmbed = new Discord.MessageEmbed()
    //   .setColor("#FFD700")
    //   .setTitle("Here is sum soup, just for you " + msg.author.username)
    //   .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    //   .setDescription("I hope you enjoy!")
    //   .setImage(image)
    //   .setTimestamp();

    msg.channel.send(
      embed(
        "Here is sum soup, just for you",
        "#FFD700",
        "I hope you enjoy!",
        msg.author,
        image
      )
    );
  }
};
