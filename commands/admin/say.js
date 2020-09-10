module.exports = {
  name: "say",
  hidden: true,
  description: "Repeats back a message of your choice",
  usage: "[message]",
  owner: true,
  execute(msg, args) {
    if (args.length && msg.author.id == process.env.DEVID) {
      // msg.channel.startTyping()
      // setTimeout(() => {
      msg.channel.send(args.join(" "));
      // msg.delete();
      // msg.channel.stopTyping(true);
      // }, typingTime);
    }
  },
};
