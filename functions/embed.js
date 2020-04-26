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

  if (msg && val) embed.addField(msg, val, true);

  embed.setFooter(author.tag, author.displayAvatarURL()).setTimestamp();

  return embed;
};
