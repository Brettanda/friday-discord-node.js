const { devId } = require("../config.json");

module.exports = {
  name: "say",
  hidden: true,
  description: "Repeats back a message of your choice",
  usage: "[message]",
  execute(msg, args, bot) {
    if (args.length && msg.author.id == devId) {
      msg.channel.startTyping()
      setTimeout(() => {
        msg.channel.send(args.join(" "));
        msg.channel.stopTyping(true);
      }, 4000);
    }
  }
};
