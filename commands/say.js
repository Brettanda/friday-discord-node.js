module.exports = {
  name: "say",
  description: "Repeats back a message of your choice",
  usage: "[message]",
  execute(msg, args) {
    if(args.length) {
      msg.channel.send(args.join(" "));
      msg.delete();
    }
  }
}