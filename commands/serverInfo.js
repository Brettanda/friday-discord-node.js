const { embed } = require("../functions");

module.exports = {
  name: "server",
  aliases: ["guild", "serverinfo", "guildinfo"],
  description: "Gives you info about the current server",
  execute(msg, args = "") {
    const reply = embed(
      msg.guild.name + " - info",
      "#fdfdfd",
      "",
      msg.author,
      "",
      "",
      "",
      ["Server Name","Members","Owner","Server ID","Region"],
      [msg.guild.name, msg.guild.memberCount, msg.guild.owner.user.tag, msg.guild.id,msg.guild.region]
    );
    msg.channel.send(reply);
  }
};
