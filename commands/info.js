const func = require("../functions");
const { delMSGtimeout } = require("../config.json");

module.exports = {
  name: "info",
  description: "Displays some information about myself :)",
  async execute(msg, args, bot) {
    const uptime = bot.uptime / 3600000;

    const guilds = await bot.shard.fetchClientValues("guilds.cache.size");
    // const activity = await bot.shard.fetchClientValues('user.presence.activities[0].name').then(console.log);

    console.log(bot.user.presence.activities);

    await msg.channel.send(
      func.embed(
        `${bot.user.username} - Info`,
        "#fdfdfd",
        "Some information about me, Friday ;)",
        msg.author,
        "",
        "",
        "",
        ["Username", "Uptime", "Guilds joined", "Status", "Loving Life"],
        [
          bot.user.username,
          uptime + " hours",
          // bot.guilds.cache.map((item) => item.name).length,
          guilds,
          bot.user.presence.activities[0].name,
          "true",
        ],
        bot.user.displayAvatarURL()
      )
    );
  },
};
