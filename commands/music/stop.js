const { delMSGtimeout } = require("../../config.json");
const func = require("../../functions");

const queue = require("./index").queue;

module.exports = {
  name: "stop",
  aliases: ["leave", "end", "clear"],
  description: "Leaves the voice channel that i am apart of",
  async execute(msg, args = "", bot) {
    if (msg.channel.type == "dm") return await msg.channel.send("You can only use this command in server text channel");

    if (queue.get(msg.guild.id)) queue.delete(msg.guild.id);

    msg.channel.send(func.embed({ title: "The queue has been cleared", color: "#7BDCFC", author: msg.author })).then((status) => status.delete({ timeout: delMSGtimeout }));

    await require("./index").leave(msg, bot);
  },
};
