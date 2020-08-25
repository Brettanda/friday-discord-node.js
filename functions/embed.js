const Discord = require("discord.js");

module.exports = (
  title = "",
  color = "",
  description = "",
  author = Object,
  image,
  usage,
  aliases,
  msg = [""] || "",
  val = [""] || "",
  extraM = "",
  extraV = "",
  inline = true,
  thumbNail
) => {
  const embed = new Discord.MessageEmbed();

  if (title != "") embed.setTitle(title);

  if (description != "") embed.setDescription(description);

  if (color != "") embed.setColor(color);

  if (image) embed.setImage(image);

  if (Array.isArray(msg) && msg != [""] && msg != "" && Array.isArray(val) && val != [""] && val != "")
    msg.map((item, index) => embed.addField(item, val[index], inline));

  if (typeof msg == "string" && msg != "" && typeof val == "string" && val != "")
    embed.addField(msg, val, inline);

  if(extraM != "" && extraV != "") embed.addField(extraM,extraV,inline);

  if (thumbNail != "") embed.setThumbnail(thumbNail);

  return embed
    .setFooter(`Called by: ${author.username}`, author.displayAvatarURL())
    .setTimestamp();
};
