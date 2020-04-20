module.exports = {
  name: "d",
  hidden: true,
  description: "D&D dice rolling",
  usage: "[Dice face count]+[Dice modifier]",
  execute(msg,args,bot) {
    if(!args.length) {msg.reply("Don't forget the dice face count");return};
  }
}