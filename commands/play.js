// const fs = require("fs");
const ytdl = require("ytdl-core");
const func = require("../functions");
const {delMSGtimeout} = require("../config.json");

module.exports = {
  name: "play",
  usage: "[Audio URL]",
  description: "Plays the audio from a YouTube video",
  async execute(msg, args = "",bot) {
    // const songInfo = await ytdl.getInfo(args[0], (err,info) => {if(err) {throw err; msg.reply(err[0])}});
    if(args == "") {
      msg.reply("Don't forget to add the YouTube url after the command. For example: `!play https://youtube.com/watch?v=11111111111`");
      return;
    }
    const songInfo = await ytdl.getInfo(args[0]);
    
  //   ytdl.getInfo(videoID, (err, info) => {
  // if (err) throw err;
  // let format = ytdl.chooseFormat(info.formats, { quality: '134' });
  // if (format) {
  //   console.log('Format found!');
  // }
    const song = {
      title: songInfo.title,
      url: songInfo.video_url
    };

    if (msg.member.voice.channel && msg.member.voice.channel.joinable()) {
      const connection = await msg.member.voice.channel.join();

      const disp = connection.play(ytdl(song.url, { filter: 'audioonly' }));

      disp.on("start", () => {
        msg.channel.send(func.embed("Now Playing: `" + song.title + "`", "#ff0000", "", msg.author)).then(status => 
          status.delete({ timeout: delMSGtimeout})
        );
        console.info("Now Playing: `" + song.title + "`");
        // bot.user.setActivity(song.title,{type:"WATCHING"});
      });

      disp.on("finish", () => {
        msg.channel
          .send(func.embed("Finished Playing: `" + song.title + "`", "#ff0000", "", msg.author))
          .then(status => 
              status.delete({ timeout: delMSGtimeout})
          );
        console.info("Finished Playing: `" + song.title + "`");
        // bot.user.setActivity("My thoughts",{type:"LISTENING"});
      });

      // Always remember to handle errors appropriately!
      disp.on("error", msg.reply("Something went wrong").then(status => status.delete({ timeout: delMSGtimeout})));
    } else if(!msg.member.voice.joinable) {
      await msg.reply("I looks like I am unable to join that voice channel. It might be full")
    } else {
      await msg.reply("You have to join a voice channel for me to join");
    }
  }
};
