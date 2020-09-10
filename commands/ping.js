module.exports = {
  name: "ping",
  hidden: true,
  description: "Ping!",
  execute(msg) {
    msg.reply("pong");
    // msg.channel.send('pong');
    console.info("pong");
  },
};
