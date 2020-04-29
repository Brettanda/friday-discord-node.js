module.exports = {
  name: "pause",
  hidden: true,
  async execute(msg,args = "",bot) {
    if (msg.member.voice.channel) {
      await msg.member.voice.channel.leave();
    }
  }
}