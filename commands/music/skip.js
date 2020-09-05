const { delMSGtimeout } = require("../../config.json");
const func = require("../../functions");

const queue = require("./index").queue;

module.exports = {
  name: "skip",
  aliases: ["next"],
  description: "Plays the next song or ends the stream if the queue is empty",
  async execute(msg, args = "", bot) {
    if (msg.channel.type == "dm") return await msg.channel.send("You can only use this command in server text channel");
    const serverQueue = queue.get(msg.guild.id);

    if (typeof serverQueue == "undefined") {
      return await msg.reply("There is no music to skip");
    }

    if (!msg.member.voice.channel)
      return msg.channel
        .send(
          func.embed({
            title: `You have to be in a voice channel to stop the music!`,
            color: "#7BDCFC",
            author: msg.author,
          })
        )
        .then((status) => {
          status.delete({ timeout: delMSGtimeout });
        });
    if (!serverQueue)
      return msg.channel
        .send(
          func.embed({
            title: `There is no song that I could skip!`,
            color: "#7BDCFC",
            author: msg.author,
          })
        )
        .then((status) => {
          status.delete({ timeout: delMSGtimeout });
        });
    serverQueue.connection.dispatcher.end();
  },
};
