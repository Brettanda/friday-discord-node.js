const { embed } = require("../functions");

module.exports = {
  name: "server",
  aliases: ["guild", "serverinfo", "guildinfo"],
  description: "Gives you info about the current server",
  execute(msg) {
    if (msg.channel.type == "dm") return msg.channel.send("This command only works in a server");

    const reply = embed({
      title: msg.guild.name + " - info",
      color: "#fdfdfd",
      author: msg.author,
      msg: ["Server Name", "Members", "Owner", "Server ID", "Region", "Verified", "Partnered"],
      val: [msg.guild.name, msg.guild.memberCount, msg.guild.owner.user.tag, msg.guild.id, msg.guild.region, msg.guild.verified, msg.guild.partnered],
      thumbNail: msg.guild.iconURL(),
    });
    msg.channel.send(reply);
  },
};
