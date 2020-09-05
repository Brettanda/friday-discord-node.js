const { embed } = require("./embed");

module.exports = (content = "", bot = {}, chat = "log-issues", msg, title = "") => {
  Array.from(bot.guilds.cache)
    .filter((item) => item[0] == process.env.SUPPORTGUILD)[0][1]
    .channels.cache.find((channel) => channel.name == chat)
    .send(embed({
      title: title != "" ? title : "",
      description: content,
      author: msg.author
    })
      // `${title ? `**` : ""}${title ? title : ""}${title ? `**\n> ` : ""}${content}${
      //   msg ? `\n- \`` : ""
      // }${msg && msg.author && msg.author.tag ? msg.author.tag : ""}${msg ? `\`` : ""}`
    );
};
