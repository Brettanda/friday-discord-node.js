module.exports = {
  name: "ping",
  hidden: true,
  description: "Ping!",
  execute(msg, args) {
    msg.reply("pong");
    // msg.channel.send('pong');
    console.info("pong");
  },
};
