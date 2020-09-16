const { delMSGtimeout } = require("../../config.json");
const func = require("../../functions");

module.exports = {
  name: "skip",
  aliases: ["next"],
  description: "Plays the next song or ends the stream if the queue is empty",
  category: "music",
  async execute(msg) {
    const audioQueue = require("./index").audioQueue;
    if (msg.channel.type == "dm") return await msg.channel.send(func.embed({ title: "You can only use this command in server text channel", color: "#7BDCFC", author: msg.author }));
    const serverQueue = audioQueue.get(msg.guild.id);

    if (typeof serverQueue == "undefined") return await msg.channel.send(func.embed({ title: "There is no music to skip", color: "#7BDCFC", author: msg.author }));

    if (!msg.member.voice.channel) {
      return msg.channel
        .send(
          func.embed({
            title: "You have to be in a voice channel to stop the music!",
            color: "#7BDCFC",
            author: msg.author,
          }),
        )
        .then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
    }
    if (!serverQueue) {
      return msg.channel
        .send(
          func.embed({
            title: "There is no song that I could skip!",
            color: "#7BDCFC",
            author: msg.author,
          }),
        )
        .then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
    }
    serverQueue.connection.dispatcher.end();
  },
};
