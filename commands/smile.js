const snekfetch = require("snekfetch");
const MessageAttachment = require("discord.js");

const func = require("../functions");

var postedMemes = [];

module.exports = {
  name: "smile",
  description: "Gets a r/mademesmile meme from Reddit and sends the image",
  async execute(msg, args, bot) {
    var sub = ["mademesmile"];
    const chName = msg.channel.name;
    // if (!chName.includes("no") && !chName.includes("dont")) {
    //   if (chName.includes("anime") || chName.includes("weeb")) {
    //     sub = ["animemes"];
    //   } else if (msg.channel.nsfw && chName.includes("hentai")) {
    //     sub = ["hentaimemes"];
    //   } else if (
    //     msg.channel.nsfw &&
    //     (chName.includes("disturbing") || chName.includes("wtf"))
    //   ) {
    //     sub = ["wtf","creepy","makemesuffer"];
    //   } else if(chName.includes("farmbuild") || chName.includes("minecraft")) {
    //     sub = ["minecraftmemes"]
    //   }
    // }
    sub = sub[func.random(0, sub.length)];
    // console.log(sub)
    try {
      const { body } = await snekfetch
        .get(`https://www.reddit.com/r/${sub}.json?sort=top&t=week`)
        .query({ limit: 800 });

      var allowed = msg.channel.nsfw
        ? body.data.children
        : body.data.children.filter((post) => !post.data.over_18);

      allowed = allowed.filter((post) => post.data.url.includes("https://i.redd.it/"));

      if (!allowed.length)
        return await msg.channel.send(`It seems I am out of fresh \`${sub}\`!, Try again later.`);

      const randomnumber = func.random(0, allowed.length),
        data = allowed[randomnumber].data;

      if (postedMemes.includes(data.url)) return;

      postedMemes.push(data.url);

      await msg.channel.send(
        func.embed({
          // data.title, `Here is a meme`"",
          color: 0x00a2e8,
          description: `**${data.title}** Posts provided by **r/${sub}** posted by: **${data.author}**`,
          author: msg.author,
          image: data.url,
        })
      );
    } catch (err) {
      return console.log(err);
    }
  },
};
