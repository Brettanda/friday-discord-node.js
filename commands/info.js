const func = require("../functions");
const { delMSGtimeout } = require("../config.json");

module.exports = {
	name: "info",
	description: "Displays some information about myself :)",
	execute(msg,args,bot) {
		const uptime = bot.uptime / 3600000;
		msg.channel.send(
			func.embed(
				`${bot.user.username} - Info`,
				"#fdfdfd",
				"Some information about me, Friday ;)",
				msg.author,
				"",
				"",
				"",
				["Username","Uptime","Guilds joined","Status","Loving Life"],
				[bot.user.username, uptime + " hours", bot.guilds.cache.map(item => item.name).length, bot.user.presence.activities[0].name,"true"],
				bot.user.displayAvatarURL()))
	}
}