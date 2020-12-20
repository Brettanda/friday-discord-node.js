const { delMSGtimeout } = require("../../config.json");
const embed = require("../../functions/embed");

const audioQueue = new Map();

(exports.audioQueue = audioQueue),
  (exports.play = require("./play")),
  (exports.stop = require("./stop")),
  (exports.toggle = require("./toggle")),
  (exports.join = require("./join")),
  (exports.state = require("./stat")),
  ((exports.skip = require("./skip")), (exports.queue = require("./queue")));

// exports.serverQueue =
// TODO: Add a restriction so that only the person that started the music and admins can skip/stop songs

// exports.volume = {
//   name: "volume",
//   aliases: ["vol"],
//   usage: "[Volume to set or leave blank for the current volume]",
//   description:
//     "Shows you the current volume or sets the volume with an argument",
//   hidden: true,
//   async execute(msg, args = "", bot) {
//     if (msg.channel.type == "dm")
//       return await msg.channel.send(
//         "You can only use this command in server text channel"
//       );
//     const serverQueue = queue.get(msg.guild.id);
//     if (args == "")
//       return msg.channel
//         .send(
//           func.embed(
//             `Current Volume: ${serverQueue.connection.dispatcher.volume}`,
//             "#7BDCFC",
//             "",
//             msg.author
//           )
//         )
//         .then(status => {
//           status.delete({ timeout: delMSGtimeout });
//         });
//   }
// };

// exports.add = {
//   name: "add",
//   hidden: true,
//   async execute(msg, args = "", bot) {
//     const serverQueue = queue.get(msg.guild.id);
//   }
// };

async function leave(msg, bot) {
  if (msg.channel.type == "dm") return msg.channel.send("You can only use this command in server text channel");

  const serverQueue = audioQueue.get(msg.guild.id);

  if (typeof serverQueue == "undefined" || serverQueue.connection == null || serverQueue.connection.dispatcher == null) {
    // console.log(Array.from(bot.voice.connections).length);
    // console.log(bot.voice);

    if (Array.from(bot.voice.connections).length > 0) {
      return await bot.voice.connections.map(item => item.channel.leave());
      // await msg.reply("I will leave. For now").then(status => {
      //   status.delete({ timeout: delMSGtimeout });
      // });
    } else if (Array.from(bot.voice.connections).length == 0) {
      const status = await msg.channel.send(
        embed({
          title: "I am either not connected to any voice channel or something has gone wrong to prevent me from leaving",
          description: "If I am in a voice channel just wait a minute or two for me to leave automatically",
          color: "#7BDCFC",
          author: msg.author,
        }),
      );
      return status.delete({ timeout: delMSGtimeout });
    }
    return msg.reply("There is no music to stop");
  }

  // if (serverQueue.connection.dispatcher.end == null) {
  //   if (Array.from(bot.voice.connections).length > 0) {
  //     await bot.voice.connections.map(item => item.channel.leave());
  //     await msg.reply("I will leave. For now").then(status => {
  //       status.delete({ timeout: delMSGtimeout });
  //     });
  //   } else {
  //     await msg
  //       .reply("I am not connected to any voice channel")
  //       .then(status => {
  //         status.delete({ timeout: delMSGtimeout });
  //       });
  //   }
  //   return;
  // }

  serverQueue.songs = [];
  serverQueue.connection.disconnect();
}

exports.leave = leave;
