const {delMSGtimeout} = require("../config.json");

module.exports = {
  name: "stop",
  description: "Leaves the voice channel that i am apart of",
  async execute(msg, args = "",bot) {
    if (Array.from(bot.voice.connections).length > 0) {
      await bot.voice.connections.map(item => item.channel.leave());
      await msg.reply("I will leave. For now").then(status => {
        status.delete({timeout:delMSGtimeout});
      });
    } else {
      await msg.reply("I am not connected to any voice channel").then(status => {
        status.delete({timeout:delMSGtimeout});
      });
    }
  }
};
