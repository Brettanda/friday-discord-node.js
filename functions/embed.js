const Discord = require("discord.js");

module.exports = (
  title,
  color,
  description,
  author,
  image,
  usage,
  aliases,
  msg,
  val
) => {
  const embed = new Discord.MessageEmbed();

  if (title) embed.setTitle(title);

  if (description) embed.setDescription(description);

  if (color) embed.setColor(color);

  if (image) embed.setImage(image);

  if (Array.isArray(msg) && Array.isArray(val)) msg.map((item,index) => embed.addField(item, val[index], true));

  if (typeof msg == "string" && typeof val == "string") embed.addField(msg,val,true);

  embed.setFooter(author.tag, author.displayAvatarURL()).setTimestamp();

  return embed;
};
