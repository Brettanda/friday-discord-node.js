const { delMSGtimeout } = require("../../config.json");
const { embed } = require("../../functions");

const audioQueue = require("./index").audioQueue;

module.exports = {
  name: "queue",
  description: "Displays the current queue of music",
  category: "music",
  async execute(msg, args, bot) {
    if (msg.channel.type == "dm") return await msg.channel.send(embed({ title: "You can only use this command in server text channel", color: "#7BDCFC", author: msg.author }));
    const serverQueue = audioQueue.get(msg.guild.id);

    if (!msg.member.voice.channel) {
      return msg.channel.send(
        embed({
          title: `Command: \`${msg.cleanContent}\`\nYou need to be in a voice channel to play music!`,
          color: "#7BDCFC",
          author: msg.author,
        }),
      );
    }

    if (typeof serverQueue == "undefined") return await msg.reply(embed({ title: "There is no music playing right now", color: "#7BDCFC", author: msg.author }));

    const upNext = serverQueue.songs.map(item => item.title);
    upNext.shift();

    msg.channel.send(
      embed({
        title: "The audio lineup🎶",
        description: `Currently playing🎧: **${serverQueue.songs[0].title}**${serverQueue.songs.length > 1 ? `\n\nUp Next: **${upNext.join("**\n**")}**` : ""}`,
        color: "#7BDCFC",
        author: msg.author,
      }),
    );
  },
};
