const { embed, msgDev } = require("../functions");

module.exports = {
  name: "issue",
  aliases: ["problem"],
  description:
    "If you have an issue or noticed a bug with Friday, this will send a message to the developer.",
  usage: "[Description of issue and steps to recreate the issue]",
  execute(msg, args = "", bot) {
    if(args == "") {
      msg.channel.send("Don't forget to describe your issue. For example `!issue this is my issue`");
      return;
    }

//     If this was an error, please use `!issue` to submit this to the developer. Please include what happened and the steps to reproduce the error
    
    msgDev(args.join(" "),msg,bot,"Issue");

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
