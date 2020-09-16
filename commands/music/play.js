/* eslint-disable max-statements-per-line */
/* eslint-disable max-nested-callbacks */
const ytdl = require("ytdl-core-discord");
// const scdl = require("soundcloud-downloader"); https://github.com/chrlew082/musicbot/blob/master/commands/play.js
const search = require("yt-search");

const { delMSGtimeout } = require("../../config.json");
const func = require("../../functions");

const audioQueue = require("./index").audioQueue;

module.exports = {
  name: "play",
  aliases: ["add"],
  usage: "[Audio URL] or [Video title]",
  description: "Plays the audio from a YouTube video",
  category: "music",
  async execute(msg, args = "", bot) {
    // console.log(bot.voice.connections)
    if (args == "") {
      return msg.channel.send(
        func.embed({
          title:
            "Don't forget to add the YouTube url after the command. For example: `!play https://youtu.be/dQw4w9WgXcQ`. You can also input the title of a video and I will search for that video. `!play uptown funk`",
          color: "#7BDCFC",
          message: msg.cleanContent,
          author: msg.author,
        }),
      );
    }

    if (msg.channel.type == "dm") return msg.channel.send(func.embed({ title: "You can only use this command in server text channel", color: "#7BDCFC", author: msg.author }));

    if (!msg.member.voice.channel) {
      return msg.channel.send(
        func.embed({
          title: "You need to be in a voice channel to play music!",
          color: "#7BDCFC",
          message: msg.cleanContent,
          author: msg.author,
        }),
      );
    }

    if (msg.guild.afkChannel == msg.member.voice.channel) return msg.channel.send(func.embed({ title: "Move out of the AFK channel to play audio.", color: "#7BDCFC", author: msg.author }));

    const permissions = msg.member.voice.channel.permissionsFor(msg.client.user);

    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return msg.channel.send(
        func.embed({
          title: "I need the permissions to join and speak in your voice channel!",
          color: "#7BDCFC",
          message: msg.cleanContent,
          author: msg.author,
        }),
      );
    }

    // const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    // const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    // const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;

    if (func.isURL(args.join(" ")) == false) {
      return search(args.join(" "), async (err, res) => {
        if (err) {
          console.error(err);
          func.msgDev(err, bot, "log-errors", msg, "Music Error");
          return msg.channel.send("Something went wrong");
        }

        const videos = res.videos.slice(0, 9);

        let resp = "";

        videos.map((ite, i) => (resp += `**[${parseInt(i) + 1}]:** ${videos[i].title}\n`));

        resp += `\n**Choose a reaction number between 1 and ${videos.length}**`;

        const musicChoice = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

        msg.channel
          .send(
            func.embed({
              title: `**Search for:** ${args.join(" ")}`,
              color: "#7BDCFC",
              author: msg.author,
              msg: "Results",
              val: resp,
              inline: false,
            }),
          )
          .then(item => {
            // This seemed to be the only way to have the musicChoice show everytime. Sometimes they would only show the first one and stop
            // prettier-ignore
            item.react(musicChoice[0]).then(() => item.react(musicChoice[1]).then(() => item.react(musicChoice[2]).then(() => item.react(musicChoice[3]).then(() => item.react(musicChoice[4]).then(() => item.react(musicChoice[5]).then(() => item.react(musicChoice[6]).then(() => item.react(musicChoice[7]).then(() => item.react(musicChoice[8]).catch(() => { return; })).catch(() => { return; })).catch(() => { return; })).catch(() => { return; })).catch(() => { return; })).catch(() => { return; })).catch(() => { return; })).catch(() => { return; })).catch(() => { return; });

            const filter = (reaction, user) => musicChoice.filter(item => item === reaction.emoji.name) && user.bot == false;

            const collector = item.createReactionCollector(filter);

            collector.videos = videos;

            collector.once("collect", async function (r) {
              const num = musicChoice.indexOf(musicChoice.filter(item => item === r.emoji.name)[0]) + 1;
              const serverQueue = audioQueue.get(msg.guild.id);

              const song = {
                title: this.videos[parseInt(num) - 1].title,
                url: this.videos[parseInt(num) - 1].url,
                duration: this.videos[parseInt(num) - 1].duration.timestamp,
                // seek: 0,
              };

              if (!serverQueue) {
                const queueContruct = {
                  textChannel: msg.channel,
                  voiceChannel: msg.member.voice.channel,
                  connection: null,
                  songs: [],
                  volume: 0.1,
                  playing: true,
                };

                audioQueue.set(msg.guild.id, queueContruct);

                queueContruct.songs.push(song);

                try {
                  // if(bot.voice.connections.map(item => item).length == 0)
                  // const connection = await

                  queueContruct.connection = await msg.member.voice.channel.join();
                  item.delete();
                  await play(msg, queueContruct.songs[0], bot);
                } catch (err) {
                  console.log(err);
                  audioQueue.delete(msg.guild.id);
                  item.delete();
                  return msg.channel.send(err).then(status => {
                    status.delete({ timeout: delMSGtimeout });
                  });
                }
              } else {
                // console.log(bot.voice.connections.map(item => item).length)
                await msg.member.voice.channel.join();
                serverQueue.songs.push(song);
                item.delete();
                return msg.channel
                  .send(
                    func.embed({
                      title: `${song.title} has been added to the queue!`,
                      color: "#7BDCFC",
                      author: msg.author,
                    }),
                  )
                  .then(status => {
                    status.delete({ timeout: delMSGtimeout * 5 });
                  });
              }
            });

            item.delete({ timeout: delMSGtimeout }).catch(() => {});
          });
      });
    }

    const serverQueue = audioQueue.get(msg.guild.id);
    // const songInfo = await ytdl.getInfo(args[0], (err,info) => {if(err) {throw err; msg.reply(err[0])}});

    // TODO: make sure that videos with errors are skipped and don't break friday
    process.once("unhandledRejection", async error => {
      if (error.toString().includes("Error: FFmpeg/avconv not found!")) {
        console.error("Run `sudo apt install ffmpeg`");
        func.msgDev("Run `sudo apt install ffmpeg`", bot, "log-errors");
        msg.channel.send(func.embed({ title: "An error has occured! I have notified my developer and this will be solved ASAP" }));
        // console.log(serverQueue);
        console.log(serverQueue.songs.length == 0);
        if (serverQueue.songs.length == 0) {
          serverQueue.songs = [];
          serverQueue.connection.disconnect();
          // return require("./stop").execute(msg,args)
          // await serverQueue.voiceChannel.leave();
          return audioQueue.delete(msg.guild.id);
        } else {
          serverQueue.songs.shift();
          console.log(serverQueue.songs[0]);
          return await play(msg, serverQueue.songs[0], bot);
        }
      }
    });

    function log(options = {}) {
      if (typeof options !== "object") throw new TypeError("INVALID_TYPE", "options", "object", true);
      const { error, userMSG = "", devMSG = "", userDesc = "", chat = "log-issues" } = options;
      console.error(error);
      if (devMSG) func.msgDev(devMSG, bot, chat, msg, "Music");
      return msg.channel.send(
        func.embed({
          title: userMSG,
          description: userDesc,
          color: "#7BDCFC",
          author: msg.author,
        }),
      );
    }

    const item = await ytdl.getInfo(args[0]).catch(err => {
      if (err.toString().includes("Not a YouTube domain") || err.toString().includes("No video id found:")) {
        return log({ error: "Url not a YouTube domain", userMSG: `\`${args.join(" ")}\` is not a valid YouTube URL`, devMSG: `Someone wants this url to work for music: \`${args.join(" ")}\`` });
      } else if (err.toString().includes("Video unavailable")) {
        return log({ error: "Video unavailable", userMSG: `\`${args.join(" ")}\` is showing as unavailable. Please try another video.` });
      } else {
        return log({
          error: err,
          userMSG: "Something has gone wrong. Please try again later.",
          chat: "log-errors",
          userDesc: "There is a good chance that this video is age restricted, and I am having trouble playing it because of that.",
          devMSG: err,
        });
      }
    });
    if (typeof item.video_url == "undefined") return;

    console.log(args[0].match(/[?&]t=([0-9]+)/) ? args[0].match(/[?&]t=([0-9]+)/)[1] : 0);

    const song = {
      title: item.title,
      url: item.video_url,
      duration: func.formatSec(item.length_seconds),
      // seek: args[0].match(/[?&]t=([0-9]+)/) ? args[0].match(/[?&]t=([0-9]+)/)[1] : 0,
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: msg.channel,
        voiceChannel: msg.member.voice.channel,
        connection: null,
        songs: [],
        volume: 0.1,
        playing: true,
      };

      audioQueue.set(msg.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        // if(bot.voice.connections.map(item => item).length == 0)
        // const connection = await
        msg.member.voice.channel.join().then(async con => {
          queueContruct.connection = con;
          // con.delete();
          await play(msg, queueContruct.songs[0], bot);
        });
      } catch (err) {
        queueContruct.connection = await msg.member.voice.channel.join();

        console.log(err);
        audioQueue.delete(msg.guild.id);
        return msg.channel.send(err).then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
      }
    } else {
      serverQueue.songs.push(song);
      return msg.channel
        .send(
          func.embed({
            title: `\`${song.title}\` has been added to the queue!`,
            color: "#7BDCFC",
            author: msg.author,
          }),
        )
        .then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
    }
  },
};

async function play(msg, song, bot) {
  const serverQueue = audioQueue.get(msg.guild.id);

  if (!song) {
    console.log("no song");
    serverQueue.voiceChannel.leave();
    return audioQueue.delete(msg.guild.id);
  }

  await serverQueue.connection.voice.setSelfDeaf(true);

  const dispatcher = serverQueue.connection
    .play(
      await ytdl(song.url),
      {
        filter: "audioonly",
        quality: "highestaudio",
        format: "mp3",
        type: "opus",
        // highWaterMark: 50,
        volume: 0.2,
      },
      // { seek: song.seek }, //, volume: 0.1, highWaterMark: 50 },
    )
    .on("finish", () => {
      console.log("finish");
      serverQueue.songs.shift();

      if (serverQueue.songs.length == 0) {
        msg.channel.send(func.embed({ title: "Finished the queue", color: "#7BDCFC" })).then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
        return require("./index").leave(msg, msg.client);
      }
      return play(msg, serverQueue.songs[0], bot);
    })
    .on("error", error => {
      console.error("Player: ", error);
      serverQueue.textChannel.send(func.embed({ title: "Something went wrong while connecting to the voice channel. Please try again later!", color: "#7BDCFC", author: msg.author })).then(status => {
        status.delete({ timeout: delMSGtimeout * 4 });
      });
      return func.msgDev(`**I failed to join a voice channel: **${error}`, bot, "log-errors", msg, "Music Error");
    });

  dispatcher.setVolume(0.1);
  // dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel
    .send(func.embed({ title: `Now Playing: **${song.title}**`, color: "#7BDCFC", author: msg.author, msg: ["Duration", "Songs in queue"], val: [song.duration, serverQueue.songs.length - 1] }))
    .then(status => {
      status.delete({ timeout: delMSGtimeout * 2 });
    });
}
