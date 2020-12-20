const { soups } = require("../config.json");
const { embed } = require("../functions");

module.exports = {
  name: "souptime",
  aliases: ["soup"],
  description: "Soup Time",
  execute(msg) {
    const num = Math.floor(Math.random() * (+soups.length - +0) + +0);
    const image = soups[num];

    msg.channel.send(
      embed({
        title: "Here is sum soup, just for you",
        color: "#FFD700",
        description: "I hope you enjoy!",
        author: msg.author,
        image: image,
      }),
    );
  },
};
