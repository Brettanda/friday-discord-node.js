const embed = require("../../functions/embed");
// const { /* delMSGtimeout, */ prefix } = require("../../config.json");

// const audioQueue = require("./index").audioQueue;

module.exports = {
  name: "join",
  category: "music",
  hidden: true,
  description: "Joins the voice channel you are in.",
  async execute(msg, args = "", bot, c, prefix) {
    msg.channel.send(embed({ title: `I will join the voice channel when you want me to play something. To do so use the \`${prefix}play\` command`, author: msg.author, color: "#7BDCFC" }));
    // const serverQueue = audioQueue.get(msg.guild.id);

    // if (!serverQueue) {
    //   const queueContruct = {
    //     textChannel: msg.channel,
    //     voiceChannel: msg.member.voice.channel,
    //     connection: null,
    //     songs: [],
    //     volume: 0.1,
    //     playing: true,
    //   };

    //   try {
    //     queueContruct.connection = await msg.member.voice.channel.join();
    //     await msg.channel.send(embed({ title: `I have joined \`${msg.channel.name}\``, author: msg.author }));
    //     audioQueue.set(msg.guild.id, queueContruct);
    //   } catch (err) {
    //     console.log(err);
    //     audioQueue.delete(msg.guild.id);
    //     return msg.channel.send(err).then(status => {
    //       status.delete({ timeout: delMSGtimeout });
    //     });
    //   }
    // } else {
    //   return await msg.channel.send(embed({ title: `I have already joined \`${serverQueue.voiceChannel.name}\`` }));
    // }
  },
};
