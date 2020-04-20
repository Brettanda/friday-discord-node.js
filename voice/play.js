const fs = require("fs");
const ytdl = require("ytdl-core");
const {delMSGtimeout} = require("../config.json");

module.exports = {
  name: "play",
  usage: "[Audio URL]",
  description: "Plays the audio from a YouTube video",
  async execute(msg, args = "",bot) {
    // const songInfo = await ytdl.getInfo(args[0], (err,info) => {if(err) {throw err; msg.reply(err[0])}});
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

    if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join();

      const disp = connection.play(ytdl(song.url));

      disp.on("start", () => {
        msg.channel.send("Now Playing: `" + song.title + "`").then(status => {
          setTimeout(() => {
            status.delete();
          }, delMSGtimeout);
        });
        console.info("Now Playing: `" + song.title + "`");
        // bot.user.setActivity(song.title,{type:"WATCHING"});
      });

      disp.on("finish", () => {
        msg.channel
          .send("Finished Playing: `" + song.title + "`")
          .then(status => {
            setTimeout(() => {
              status.delete();
            }, delMSGtimeout);
          });
        console.info("Finished Playing: `" + song.title + "`");
        // bot.user.setActivity("My thoughts",{type:"LISTENING"});
      });

      // Always remember to handle errors appropriately!
      disp.on("error", console.error);
    }
  }
};
