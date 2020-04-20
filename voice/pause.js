module.exports = {
  name: "pause",
  async execute(msg,args = "",bot) {
    if (msg.member.voice.channel) {
      await msg.member.voice.channel.leave();
    }
  }
}