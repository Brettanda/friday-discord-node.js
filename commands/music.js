// const fs = require("fs");
const ytdl = require("ytdl-core-discord");
const func = require("../functions");
const { delMSGtimeout } = require("../config.json");
const search = require('yt-search');
//const { stat } = require("fs");

const queue = new Map();

exports.play = {
  name: "play",
  aliases: ["add"],
  usage: "[Audio URL]",
  description: "Plays the audio from a YouTube video",
  async execute(msg, args = "", bot) {
    // const songInfo = await ytdl.getInfo(args[0], (err,info) => {if(err) {throw err; msg.reply(err[0])}});
    if (args == "")
      return msg.channel.send(
        func.embed(
          `Command: \`${msg.cleanContent}\`\nDon't forget to add the YouTube url after the command. For example: \`!play https://youtu.be/dQw4w9WgXcQ\``,
          "#7BDCFC",
          "",
          msg.author
        )
      );

    if (msg.channel.type == "dm")
      return await msg.channel.send(
        "You can only use this command in server text channel"
      );

    if (!msg.member.voice.channel /*&& !msg.member.voice.channel.joinable*/)
      return msg.channel.send(
        func.embed(
          `Command: \`${msg.cleanContent}\`\nYou need to be in a voice channel to play music!`,
          "#7BDCFC",
          "",
          msg.author
        )
      );

    const permissions = msg.member.voice.channel.permissionsFor(
      msg.client.user
    );

    if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
      return msg.channel.send(
        func.embed(
          `Command: \`${msg.cleanContent}\`\nI need the permissions to join and speak in your voice channel!`,
          "#7BDCFC",
          "",
          msg.author
        )
      );


    if(func.isURL(args.join(" ")) == false)  return await search(args.join(" "), async (err, res) => {
      if(err) {
        console.error(err);
        return msg.channel.send("something went wrong");
      }

      const videos = res.videos.slice(0,9);

      let resp = "";
      // let m = [],v = [];
      await videos.map((ite, i) => {
        // m.push(parseInt(i)+1);
        // v.push(videos[i].title);

        resp += `**[${parseInt(i)+1}]:** ${videos[i].title}\n`;
      })
      // for(var i in videos) {
      //   resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
      // }

      resp += `\n**Choose a reaction number between 1 and ${videos.length}**`;

      const musicChoice = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];

      await msg.channel.send(func.embed(`**Search for:** ${args.join(" ")}`,"#7BDCFC","",msg.author,"","","","Results",resp,"","",false)).then(async (item) => {
        // This seemed to be the only way to have the musicChoice show everytime. Sometimes they would only show the first one and stop
        item.react(musicChoice[0]).then(() => item.react(musicChoice[1]).then(() => item.react(musicChoice[2]).then(() => item.react(musicChoice[3]).then(() => item.react(musicChoice[4]).then(() => item.react(musicChoice[5]).then(() => item.react(musicChoice[6]).then(() => item.react(musicChoice[7]).then(() => item.react(musicChoice[8]).catch(err => {return})).catch(err => {return})).catch(err => {return})).catch(err => {return})).catch(err => {return})).catch(err => {return})).catch(err => {return})).catch(err => {return})).catch(err => {return});

        const filter = (reaction,user) => musicChoice.filter(item => item === reaction.emoji.name) && user.bot == false;

        const collector = item.createReactionCollector(filter);

        collector.videos = videos;

        await collector.once('collect', async function(r) {
          const num = musicChoice.indexOf(musicChoice.filter((item,i) => item === r.emoji.name)[0])+1;
          const serverQueue = queue.get(msg.guild.id);
          
          const song = {
            title: this.videos[parseInt(num)-1].title,
            url: this.videos[parseInt(num)-1].url
          };

          if (!serverQueue) {
            const queueContruct = {
              textChannel: msg.channel,
              voiceChannel: msg.member.voice.channel,
              connection: null,
              songs: [],
              volume: 5,
              playing: true
            };
      
            queue.set(msg.guild.id, queueContruct);
      
            queueContruct.songs.push(song);
      
            try {
              var connection = await msg.member.voice.channel.join();
              queueContruct.connection = connection;
              await item.delete();
              play(msg, queueContruct.songs[0]);
            } catch (err) {
              console.log(err);
              queue.delete(msg.guild.id);
              await item.delete();
              return msg.channel.send(err).then(status => {
                status.delete({ timeout: delMSGtimeout });
              });
            }
          } else {
            serverQueue.songs.push(song);
            await item.delete();
            return msg.channel
              .send(
                func.embed(
                  `${song.title} has been added to the queue!`,
                  "#7BDCFC",
                  "",
                  msg.author
                )
              )
              .then(status => {
                status.delete({ timeout: delMSGtimeout });
              });
          }
        })

        await item.delete({ timeout: delMSGtimeout }).catch(err => {});
      });
    })


    const serverQueue = queue.get(msg.guild.id);
    const songInfo = await ytdl.getInfo(args[0]).catch(err => {
      if (
        err.toString().includes("Not a YouTube domain") ||
        err.toString().includes("No video id found:")
      ) {
        console.error("Url not a YouTube domain");
        func.msgDev(`Someone wants this url to work for music: \`${args.join(" ")}\``,bot,"log-issues",msg,"Music")
        return msg.channel.send(
          func.embed(
            `\`${args.join(" ")}\` is not a valid YouTube URL`,
            "#7BDCFC",
            "",
            msg.author
          )
        );
      } else {
        console.error(err);
        return msg.reply("Something has gone wrong. Please try again later.");
      }
    });

    if (typeof songInfo.video_url == "undefined") return;

    const song = {
      title: songInfo.title,
      url: songInfo.video_url
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: msg.channel,
        voiceChannel: msg.member.voice.channel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };

      queue.set(msg.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        var connection = await msg.member.voice.channel.join();
        queueContruct.connection = connection;
        play(msg, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(msg.guild.id);
        return msg.channel.send(err).then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
      }
    } else {
      serverQueue.songs.push(song);
      return msg.channel
        .send(
          func.embed(
            `${song.title} has been added to the queue!`,
            "#7BDCFC",
            "",
            msg.author
          )
        )
        .then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
    }

    //     const connection = await msg.member.voice.channel.join();

    //     const disp = connection.play(ytdl(song.url, { filter: "audioonly" }));

    //     disp.on("start", () => {
    //       msg.channel
    //         .send(
    //           func.embed(
    //             "Now Playing: `" + song.title + "`",
    //             "#ff0000",
    //             "",
    //             msg.author
    //           )
    //         )
    //         .then(status => status.delete({ timeout: delMSGtimeout }));
    //       console.info("Now Playing: `" + song.title + "`");
    //       // bot.user.setActivity(song.title,{type:"WATCHING"});
    //     });

    //     disp.on("finish", () => {
    //       msg.channel
    //         .send(
    //           func.embed(
    //             "Finished Playing: `" + song.title + "`",
    //             "#ff0000",
    //             "",
    //             msg.author
    //           )
    //         )
    //         .then(status => status.delete({ timeout: delMSGtimeout }));
    //       console.info("Finished Playing: `" + song.title + "`");
    //       // bot.user.setActivity("My thoughts",{type:"LISTENING"});
    //     });

    //     // Always remember to handle errors appropriately!
    //     disp.on(
    //       "error",
    //       msg
    //         .reply("Something went wrong")
    //         .then(status => status.delete({ timeout: delMSGtimeout }))
    //     );
  }
};

exports.stop = {
  name: "stop",
  aliases: ["leave", "end", "clear"],
  description: "Leaves the voice channel that i am apart of",
  async execute(msg, args = "", bot) {
    if (msg.channel.type == "dm")
    return await msg.channel.send(
      "You can only use this command in server text channel"
      );
      
    if(queue.get(msg.guild.id)) queue.delete(msg.guild.id);
    
    msg.channel.send(func.embed("The queue has been cleared","#7BDCFC","",msg.author)).then(status => status.delete({ timeout:delMSGtimeout }))

    await leave(msg, bot);
  }
};

exports.toggle = {
  name: "toggle",
  aliases: ["resume", "pause"],
  description: "Toggle the pause state",
  async execute(msg, args = "", bot, command) {
    if (msg.channel.type == "dm")
      return await msg.channel.send(
        "You can only use this command in server text channel"
      );
    const serverQueue = queue.get(msg.guild.id);
    // if (msg.member.voice.channel) {
    //   await msg.member.voice.channel.leave();
    // }
    // if(args != "") return await msg.channel.send()

    if (typeof serverQueue == "undefined") {
      return await msg.reply("There is no music to pause or resume playing");
    }

    if (command == "resume" && serverQueue.connection.dispatcher.paused)
      return await serverQueue.connection.dispatcher.resume();
    else if (command == "resume" && !serverQueue.connection.dispatcher.paused)
      return await msg.channel
        .send(
          func.embed(
            `The stream has already playing`,
            "#7BDCFC",
            "",
            msg.author
          )
        )
        .then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
    if (command == "pause" && !serverQueue.connection.dispatcher.paused)
      return await serverQueue.connection.dispatcher.pause(true);
    else if (command == "pause" && serverQueue.connection.dispatcher.paused)
      return await msg.channel
        .send(
          func.embed(
            `The stream has already been paused`,
            "#7BDCFC",
            "",
            msg.author
          )
        )
        .then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
    if (command == "toggle" && !serverQueue.connection.dispatcher.paused)
      return await serverQueue.connection.dispatcher.pause(true);
    else return await serverQueue.connection.dispatcher.resume();
  }
};

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

exports.skip = {
  name: "skip",
  aliases: ["next"],
  description: "Plays the next song or ends the stream if the queue is empty",
  async execute(msg, args = "", bot) {
    if (msg.channel.type == "dm")
      return await msg.channel.send(
        "You can only use this command in server text channel"
      );
    const serverQueue = queue.get(msg.guild.id);

    if (typeof serverQueue == "undefined") {
      return await msg.reply("There is no music to skip");
    }

    if (!msg.member.voice.channel)
      return msg.channel
        .send(
          func.embed(
            `You have to be in a voice channel to stop the music!`,
            "#7BDCFC",
            "",
            msg.author
          )
        )
        .then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
    if (!serverQueue)
      return msg.channel
        .send(
          func.embed(
            `There is no song that I could skip!`,
            "#7BDCFC",
            "",
            msg.author
          )
        )
        .then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
    serverQueue.connection.dispatcher.end();
  }
};

// exports.add = {
//   name: "add",
//   hidden: true,
//   async execute(msg, args = "", bot) {
//     const serverQueue = queue.get(msg.guild.id);
//   }
// };

async function play(msg, song) {
  const serverQueue = queue.get(msg.guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(msg.guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(await ytdl(song.url), {
      type: "opus",
      liveBuffer: 20000,
      highWaterMark: 50,
      volume: false
    })
    .on("finish", () => {
      serverQueue.songs.shift();
      if (serverQueue.songs.length == 0) {
        msg.channel
          .send(func.embed("Finished the queue", "#7BDCFC", "", msg.author))
          .then(status => {
            status.delete({ timeout: delMSGtimeout });
          });
        leave(msg, msg.client);
      }
      play(msg, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));

  await dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  await serverQueue.textChannel
    .send(
      func.embed(`Now Playing: **${song.title}**`, "#7BDCFC", "", msg.author)
    )
    .then(status => {
      status.delete({ timeout: delMSGtimeout });
    });

}

async function leave(msg, bot) {
  if (msg.channel.type == "dm")
    return await msg.channel.send(
      "You can only use this command in server text channel"
    );

  const serverQueue = queue.get(msg.guild.id);

  if (
    typeof serverQueue == "undefined" ||
    serverQueue.connection == null ||
    serverQueue.connection.dispatcher == null
  ) {
    // console.log(Array.from(bot.voice.connections).length);
    // console.log(bot.voice);

    if (Array.from(bot.voice.connections).length > 0) {
      return await bot.voice.connections.map(item => item.channel.leave());
      // await msg.reply("I will leave. For now").then(status => {
      //   status.delete({ timeout: delMSGtimeout });
      // });
    } else if (Array.from(bot.voice.connections).length == 0) {
      return await msg
        .reply(
          "I am either not connected to any voice channel or something has gone wrong to prevent me from leave. If I am in a voice channel just wait a minute or two for me to leave automatically"
        )
        .then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
    }
    return await msg.reply("There is no music to stop");
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
