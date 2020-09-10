module.exports = {
  name: "servers",
  owner: true,
  hidden: true,
  execute(msg, arg, bot) {
    let string = `**Servers:** ${Array.from(bot.guilds.cache).length}\n`;
    let totalMembers = 0;
    const list = Array.from(bot.guilds.cache).sort((a, b) => {
      if (a[1].memberCount < b[1].memberCount) return 1;
      else return -1;
    });
    const gs = list.filter((guild, index) => index <= 10 && guild[1].available);
    list.map(g => console.log(g[1].name));
    gs.map(guild => {
      totalMembers = totalMembers + guild[1].memberCount;
      string += `\n**Title:** ${guild[1].name}\n**Member Count:** ${guild[1].memberCount}\n**Large:** ${guild[1].large}\n**Region:** ${guild[1].region}\n`;
    });

    string += `\n\n**Total Members in all servers:**${totalMembers}`;

    msg.channel.send(string);
  },
};
