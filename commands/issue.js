const { embed } = require("../functions");

module.exports = {
  name: "issue",
  description:
    "If you have an issue or noticed a bug with Friday, this will send a message to the developer.",
  usage: "[Description of issue and steps to recreate the issue]",
  execute(msg, args = "", bot) {
    bot.users.fetch(process.env.DEVID).then(member => {
      member.send("`" + msg.author.tag + ":` " + args.join(" "));
    });

    msg.channel.send(
      embed(
        "Your message has been sent to the developer",
        "",
        "",
        msg.author,
        "",
        "",
        "",
        "Your message:",
        args.join(" ")
      )
    );
  }
};