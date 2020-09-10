module.exports = {
  name: "react",
  owner: true,
  hidden: true,
  usage: "[MSG ID] [EMOJI]",
  execute(msg, args, bot) {
    if (args.length < 2) return msg.reply("Use this command like this `!react [MSG ID] [EMOJI]`");

    msg.channel.messages.fetch({ limit: 50 }).then(async item => {
      const message = item.filter(i => i.id == args[0]);
      if (message.length == 0) return msg.reply("Something went wrong. Check your message ID");

      args.filter((i, index) => index >= 1).map(i => Array.from(message)[0][1].react(i));
      // Array.from(message)[0][1].react(args[1]);
    });
  },
};
