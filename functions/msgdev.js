module.exports = (content = "",msg = {},bot = {},title = "No Title") => {
	bot.users.fetch(process.env.DEVID).then(member => {
		member.send(`**${title}**\n> ${content}\n- \`${msg.author.tag}\``);
	});
}