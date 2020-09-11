const func = require("../functions");
// const { delMSGtimeout } = require("../config.json");

module.exports = {
  name: "info",
  description: "Displays some information about myself :)",
  async execute(msg, args, bot) {
    const uptime = bot.uptime / 3600000;

    const guilds = await bot.shard.fetchClientValues("guilds.cache.size");
    // const activity = await bot.shard.fetchClientValues('user.presence.activities[0].name').then(console.log);

    console.log(bot.user.presence.activities);

    await msg.channel.send(
      func.embed({
        title: `${bot.user.username} - Info`,
        color: "#fdfdfd",
        description: "Some information about me, Friday ;)",
        author: msg.author,
        msg: ["Username", "Uptime", "Guilds joined", "Status", "Loving Life"],
        val: [
          bot.user.username,
          uptime + " hours",
          // bot.guilds.cache.map((item) => item.name).length,
          guilds,
          // TODO: run this command and an error shows
          bot.user.presence.activities[0].name,
          "true",
        ],
        thumbNail: bot.user.displayAvatarURL(),
      }),
    );
  },
};
