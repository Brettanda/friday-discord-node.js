const { delMSGtimeout } = require("../config.json");
const { execute } = require("./help");

exports.say = {
  name: "say",
  hidden: true,
  description: "Repeats back a message of your choice",
  usage: "[message]",
  owner: true,
  execute(msg, args) {
    if (args.length && msg.author.id == process.env.DEVID) {
      // msg.channel.startTyping()
      // setTimeout(() => {
      msg.channel.send(args.join(" "));
      // msg.delete();
      // msg.channel.stopTyping(true);
      // }, typingTime);
    }
  }
};

exports.icon = {
  name: "icon",
  owner: true,
  description: "Changes my icon",
  hidden: true,
  execute(msg, args, bot) {
    if (args[0] == "reset") {
      return bot.user
        .setAvatar(
          "https://cdn.glitch.com/2bc000cf-e82b-4d7d-815b-e1ba4350bf59%2Ffriday_logo-300x300.png?v=1591998344190"
        )
        .then(user => {
          msg
            .reply("New avatar set!")
            .then(status => status.delete({ timeout: delMSGtimeout }));
          console.log(`New avatar set!`);
        });
    }
    if (args[0] == "")
      return msg
        .reply("Change my icon with a URL of an image following the command")
        .then(status => status.delete({ timeout: delMSGtimeout }));

    return bot.user.setAvatar(args[0]).then(user => {
      msg
        .reply("New avatar set!")
        .then(status => status.delete({ timeout: delMSGtimeout }));
      console.log(`New avatar set!`);
    });
  }
};

exports.react = {
  name: "react",
  owner: true,
  hidden: true,
  usage: "[MSG ID] [EMOJI]",
  execute(msg,args,bot) {
    if(args.length < 2) return msg.reply("Use this command like this `!react [MSG ID] [EMOJI]`");
    
    msg.channel.messages.fetch({ limit: 50 }).then(async item => {
      let message = item.filter(i => i.id == args[0]);
      if(message.length == 0) return msg.reply("Something went wrong. Check your message ID");
      
      args.filter((i,index) => index >= 1).map(i => Array.from(message)[0][1].react(i));
      // Array.from(message)[0][1].react(args[1]);
    });
  }
}

exports.servers = {
  name: "servers",
  owner: true,
  hidden: true,
  async execute(msg,arg,bot) {
    var string = `**Servers:** ${Array.from(bot.guilds.cache).length}\n`;
    var totalMembers = 0;
    Array.from(bot.guilds.cache).map(guild => {
      totalMembers = totalMembers + guild[1].memberCount;
      string += `\n**Title:** ${guild[1].name}\n**Member Count:** ${guild[1].memberCount}\n**Large:** ${guild[1].large}\n**Region:** ${guild[1].region}\n`
    });

    string += `\n\n**Total Members in all servers:**${totalMembers}`;

    await msg.channel.send(string)
  }
}