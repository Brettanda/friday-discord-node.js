module.exports = {
  name: "jarvis",
  hidden: true,
  execute(msg, args, bot) {
    return msg.channel.send("My name is Friday");
  },
};
