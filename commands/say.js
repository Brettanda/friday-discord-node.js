module.export = {
  name: "say",
  description: "Repeats back a message of your choice",
  usage: "[message]",
  execute(msg, args) {
    msg.reply(msg);
  }
}