const { embed, msgDev } = require("../functions");

module.exports = {
  name: "issue",
  aliases: ["problem"],
  description: "If you have an issue or noticed a bug with Friday, this will send a message to the developer.",
  usage: "[Description of issue and steps to recreate the issue]",
  async execute(msg, args = "", bot) {
    if (args == "") {
      msg.channel.send("Don't forget to describe your issue. For example `!issue this is my issue`");
      return;
    }

    //     If this was an error, please use `!issue` to submit this to the developer. Please include what happened and the steps to reproduce the error

    msgDev(args.join(" "), bot, "log-issues", msg, "Issue");

    await msg.channel
      .send(
        embed({
          title: "Your message has been sent to the developer",
          color: "#fdfdfd",
          author: msg.author,
          msg: "Your message:",
          val: args.join(" "),
        }),
      )
      .catch(err => console.error(err));
  },
};
