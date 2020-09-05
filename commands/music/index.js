const { delMSGtimeout } = require("../../config.json");

const queue = new Map();

(exports.queue = queue), (exports.play = require("./play")), (exports.stop = require("./stop")), (exports.toggle = require("./toggle")), (exports.skip = require("./skip"));

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

  const serverQueue = queue.get(msg.guild.id);

  if (typeof serverQueue == "undefined" || serverQueue.connection == null || serverQueue.connection.dispatcher == null) {
    // console.log(Array.from(bot.voice.connections).length);
    // console.log(bot.voice);

    if (Array.from(bot.voice.connections).length > 0) {
      return await bot.voice.connections.map((item) => item.channel.leave());
      // await msg.reply("I will leave. For now").then(status => {
      //   status.delete({ timeout: delMSGtimeout });
      // });
    } else if (Array.from(bot.voice.connections).length == 0) {
      const status = await msg.reply(
        "I am either not connected to any voice channel or something has gone wrong to prevent me from leave. If I am in a voice channel just wait a minute or two for me to leave automatically"
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
