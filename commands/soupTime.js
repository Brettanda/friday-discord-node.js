const { soups } = require("../config.json");
const { embed } = require("../functions");
const Discord = require("discord.js");

module.exports = {
  name: "souptime",
  description: "Soup Time",
  execute(msg, args) {
    var num = Math.floor(Math.random() * (+soups.length - +0) + +0);
    var image = soups[num];

    msg.channel.send(
      embed({
        title: "Here is sum soup, just for you",
        color: "#FFD700",
        description: "I hope you enjoy!",
        author: msg.author,
        image: image,
      })
    );
  },
};
