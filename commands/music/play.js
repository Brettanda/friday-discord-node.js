const ytdl = require("ytdl-core-discord");
const { delMSGtimeout } = require("../../config.json");
const func = require("../../functions");
const search = require("yt-search");

const audioQueue = require("./index").audioQueue;

module.exports = {
  name: "play",
  aliases: ["add"],
  usage: "[Audio URL] or [Video title]",
  description: "Plays the audio from a YouTube video",
  async execute(msg, args = "", bot) {
    // console.log(bot.voice.connections)
    if (args == "") {
      return msg.channel.send(
        func.embed({
          title: `Command: \`${msg.cleanContent}\`\nDon't forget to add the YouTube url after the command. For example: \`!play https://youtu.be/dQw4w9WgXcQ\`. You can also input the title of a video and I will search for that video. \`!play uptown funk\``,
          color: "#7BDCFC",
          author: msg.author,
        }),
      );
    }

    if (msg.channel.type == "dm") return msg.channel.send(func.embed({ title: "You can only use this command in server text channel", color: "#7BDCFC", author: msg.author }));

    if (!msg.member.voice.channel) {
      return msg.channel.send(
        func.embed({
          title: `Command: \`${msg.cleanContent}\`\nYou need to be in a voice channel to play music!`,
          color: "#7BDCFC",
          author: msg.author,
        }),
      );
    }

    const permissions = msg.member.voice.channel.permissionsFor(msg.client.user);

    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return msg.channel.send(
        func.embed({
          title: `Command: \`${msg.cleanContent}\`\nI need the permissions to join and speak in your voice channel!`,
          color: "#7BDCFC",
          author: msg.author,
        }),
      );
    }

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
            item.react(musicChoice[0]).then(() => item.react(musicChoice[1]).then(() => item.react(musicChoice[2]).then(() => item.react(musicChoice[3]).then(() => item.react(musicChoice[4]).then(() => item.react(musicChoice[5]).then(() => item.react(musicChoice[6]).then(() => item.react(musicChoice[7]).then(() => item.react(musicChoice[8]).catch((err) => { return; }) ).catch((err) => { return; }) ).catch((err) => { return; }) ).catch((err) => { return; }) ).catch((err) => { return; }) ).catch((err) => { return; }) ).catch((err) => { return; }) ).catch((err) => { return; }) ).catch((err) => { return; });

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
                  await play(msg, queueContruct.songs[0]);
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

    const item = await ytdl.getInfo(args[0]).catch(err => {
      if (err.toString().includes("Not a YouTube domain") || err.toString().includes("No video id found:")) {
        console.error("Url not a YouTube domain");
        func.msgDev(`Someone wants this url to work for music: \`${args.join(" ")}\``, bot, "log-issues", msg, "Music");
        return msg.channel.send(
          func.embed({
            title: `\`${args.join(" ")}\` is not a valid YouTube URL`,
            color: "#7BDCFC",
            author: msg.author,
          }),
        );
      } else {
        console.error(err);
        func.msgDev(err, bot, "log-errors", msg, "Music Error");
        return msg.reply(
          func.embed({
            title: "Something has gone wrong. Please try again later.",
            description: "There is a good chance that this video is age restricted, and I am having trouble playing it because of that.",
            color: "#7BDCFC",
            author: msg.author,
          }),
        );
      }
    });
    if (typeof item.video_url == "undefined") return;

    let totalSeconds = item.length_seconds;
    const h = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;

    const song = {
      title: item.title,
      url: item.video_url,
      duration: `${h ? `${h}:` : ""}${min ? `${min}:` : ""}${sec}`,
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
          await play(msg, queueContruct.songs[0]);
        });
      } catch (err) {
        queueContruct.connection = await msg.member.voice.channel.join().on("debug", console.log);

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
            title: `${song.title} has been added to the queue!`,
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

async function play(msg, song) {
  const serverQueue = audioQueue.get(msg.guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    return audioQueue.delete(msg.guild.id);
  }

  const dispatcher = serverQueue.connection
    .play(
      await ytdl(song.url),
      {
        filter: "audioonly",
        quality: "highestaudio",
        format: "mp3",
        type: "opus",
        liveBuffer: 20000,
        highWaterMark: 50,
        volume: false,
      },
      { seek: 0, volume: 0.1, highWaterMark: 50 },
    )
    .on("finish", () => {
      console.log("finish");
      serverQueue.songs.shift();

      if (serverQueue.songs.length == 0) {
        msg.channel.send(func.embed({ title: "Finished the queue", color: "#7BDCFC", author: msg.author })).then(status => {
          status.delete({ timeout: delMSGtimeout });
        });
        return require("./index").leave(msg, msg.client);
      }
      return play(msg, serverQueue.songs[0]);
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

  serverQueue.textChannel.send(func.embed({ title: `Now Playing: **${song.title}**`, description: `Duration: ${song.duration}`, color: "#7BDCFC", author: msg.author })).then(status => {
    status.delete({ timeout: delMSGtimeout * 2 });
  });
}
