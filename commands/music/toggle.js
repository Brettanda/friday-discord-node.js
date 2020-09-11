const { delMSGtimeout } = require("../../config.json");
const func = require("../../functions");

const audioQueue = require("./index").audioQueue;

module.exports = {
  name: "toggle",
  aliases: ["resume", "pause"],
  description: "Toggle the pause state",
  async execute(msg, args = "", bot, command) {
    if (msg.channel.type == "dm") return await msg.channel.send("You can only use this command in server text channel");
    const serverQueue = audioQueue.get(msg.guild.id);
    // if (msg.member.voice.channel) {
    //   await msg.member.voice.channel.leave();
    // }
    // if(args != "") return await msg.channel.send()

    if (typeof serverQueue == "undefined") {
      return await msg.reply("There is no music to pause or resume playing");
    }

    if (command == "resume" && serverQueue.connection.dispatcher.paused) return await serverQueue.connection.dispatcher.resume();
    else if (command == "resume" && !serverQueue.connection.dispatcher.paused)
      return await msg.channel
        .send(
          func.embed({
            title: "The stream is already playing",
            color: "#7BDCFC",
            author: msg.author,
          }),
        )
        .then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
    if (command == "pause" && !serverQueue.connection.dispatcher.paused) return await serverQueue.connection.dispatcher.pause(true);
    else if (command == "pause" && serverQueue.connection.dispatcher.paused)
      return await msg.channel
        .send(
          func.embed({
            title: "The stream has already been paused",
            color: "#7BDCFC",
            author: msg.author,
          }),
        )
        .then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
    if (command == "toggle" && !serverQueue.connection.dispatcher.paused) return await serverQueue.connection.dispatcher.pause(true);
    else return await serverQueue.connection.dispatcher.resume();
  },
};
