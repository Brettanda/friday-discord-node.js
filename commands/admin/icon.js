const { delMSGtimeout } = require("../../config.json");

module.exports = {
  name: "icon",
  owner: true,
  description: "Changes my icon",
  hidden: true,
  execute(msg, args, bot) {
    if (args[0] == "reset") {
      return bot.user.setAvatar("./assets/friday-logo.png").then(user => {
        msg.reply("New avatar set!").then(status => status.delete({ timeout: delMSGtimeout }));
        console.log("New avatar set!");
      });
    }
    if (args[0] == "") return msg.reply("Change my icon with a URL of an image following the command").then(status => status.delete({ timeout: delMSGtimeout }));

    return bot.user.setAvatar(args[0]).then(() => {
      msg.reply("New avatar set!").then(status => status.delete({ timeout: delMSGtimeout }));
      console.log("New avatar set!");
    });
  },
};
