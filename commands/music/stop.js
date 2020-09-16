const { delMSGtimeout } = require("../../config.json");
const func = require("../../functions");

const audioQueue = require("./index").audioQueue;

module.exports = {
  name: "stop",
  aliases: ["leave", "end", "clear"],
  description: "Leaves the voice channel that i am apart of",
  category: "music",
  execute(msg, args = "", bot) {
    if (msg.channel.type == "dm") return msg.channel.send("You can only use this command in server text channel");

    if (audioQueue.get(msg.guild.id)) {
      audioQueue.delete(msg.guild.id);
      msg.channel.send(func.embed({ title: "The queue has been cleared", color: "#7BDCFC", author: msg.author })).then(status => status.delete({ timeout: delMSGtimeout }));
    }

    return require("./index").leave(msg, bot);
  },
};
