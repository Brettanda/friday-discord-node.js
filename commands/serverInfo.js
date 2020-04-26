const { embed } = require("../functions");

module.exports = {
  name: "server",
  aliases: ["guild", "serverinfo", "guildinfo"],
  description: "Gives you info about the current server",
  execute(msg, args = "") {
    const reply = embed(
      msg.guild.name + " - info",
      "",
      "",
      msg.author,
      "",
      "",
      "",
      "Info",
      `**Server Name**: ${msg.guild.name}\n**Members**: ${msg.guild.memberCount}\n**Owner**: ${msg.guild.owner.user.tag}\n**Server ID**: ${msg.guild.id}`
    );
    msg.channel.send(reply);
  }
};
