const func = require("../functions");
const { delMSGtimeout } = require("../config.json");

module.exports = {
	name: "info",
	description: "Displays some information about myself :)",
	execute(msg,args,bot) {
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
				[bot.user.username, bot.uptime, bot.guilds.cache.map(item => item.name).length, bot.user.presence.activities[0].name,"true"],
				bot.user.displayAvatarURL()))
	}
}