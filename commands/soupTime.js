const { soups } = require("../config.json");

module.exports = {
  name: "souptime",
  description: "Soup Time",
  execute(msg, args) {
    // msg.reply('pong');
    var num = Math.floor(Math.random() * (+soups.length - +0) + +0);
    var image = soups[num];
    msg.channel.send(image);
    // console.info("pong");
  }
};
