const Discord = require("discord.js");

/*
 * Makes a message embed
 * =====================
 * @param {Object} [options] Options
 */
module.exports = (options = {}) => {
  if (typeof options !== "object") throw new TypeError("INVALID_TYPE", "options", "object", true);
  const { title = "", color = "", description = "", author, image, usage, aliases, msg = [""] || "", val = [""] || "", extraM = "", extraV = "", inline = true, thumbNail, message } = options;

  const embed = new Discord.MessageEmbed();

  if (title != "") embed.setTitle(title);

  if (description != "") embed.setDescription(description);

  if (color != "") embed.setColor(color);
  else embed.setColor("#fdfdfd");

  if (image) embed.setImage(image);

  if (Array.isArray(msg) && msg != [""] && msg != "" && Array.isArray(val) && val != [""] && val != "") msg.map((item, index) => embed.addField(item, val[index], inline));

  if (typeof msg == "string" && msg != "" && typeof val == "string" && val != "") embed.addField(msg, val, inline);

  if (extraM != "" && extraV != "") embed.addField(extraM, extraV, inline);

  if (thumbNail != "") embed.setThumbnail(thumbNail);

  if (author) return embed.setFooter(`Called by: ${author.username} ${message ? `\`${message}\`` : ""}`, author.displayAvatarURL());
  else return embed;
};
