const {delMSGtimeout} = require("../config.json");

module.exports = {
  name: "stop",
  async execute(msg, args = "",bot) {
    //console.info(bot.username);
    if (msg.member.voice.channel) {
      await msg.member.voice.channel.leave();
      await msg.channel.send("I will leave. For now").then(status => {
        setTimeout(() => {
          status.delete();
        }, delMSGtimeout);
      });
    }
  }
};
