<<<<<<< HEAD
const snekfetch = require('snekfetch');
=======
const snekfetch = require("snekfetch");
const MessageAttachment = require("discord.js");
>>>>>>> glitch

const func = require("../functions");

var postedMemes = [];

module.exports = {
<<<<<<< HEAD
	name: "meme",
	description: "Gets a meme from Reddit and sends the an image",
	async execute(msg,args,bot) {
		var sub = ["dankmemes","memes"];
		sub = sub[func.random(0,sub.length)];
		// console.log(sub)
		try {
			const { body } = await snekfetch
				.get(`https://www.reddit.com/r/${sub}.json?sort=top&t=week`)
				.query({ limit: 800 });

			const allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);

			if (!allowed.length) return msg.channel.send(`It seems I am out of fresh ${sub}!, Try again later.`);

			const randomnumber = func.random(0,allowed.length)

			if (postedMemes.includes(allowed[randomnumber].data.url)) return;

			postedMemes.push(allowed[randomnumber].data.url);

			msg.channel.send(
				func.embed(
					/* allowed[randomnumber].data.title,*/`And a meme is served`,
					0x00A2E8,
					`Memes provided by r/${sub} posted by: ${allowed[randomnumber].data.author}`,
					msg.author,
					allowed[randomnumber].data.url
				)
			);
		} catch (err) {
			return console.log(err);
		}
	}
}
=======
  name: "meme",
  description: "Gets a meme from Reddit and sends the an image",
  async execute(msg, type) {
    var sub = ["dankmemes", "memes","comedycemetery","technicallythetruth","rareinsults"];
    if(msg.channel.type != "dm") {
      const chName = msg.channel.name;
      if (!chName.includes("no") && !chName.includes("dont")) {
        if (chName.includes("anime") || chName.includes("weeb") || type == "anime") {
          sub = ["animemes"];
        } else if (msg.channel.nsfw && chName.includes("hentai") || type == "hentai") {
          sub = ["hentaimemes"];
        } else if (
          msg.channel.nsfw &&
          (chName.includes("disturbing") || chName.includes("wtf") || type == "wtf")
        ) {
          sub = ["wtf","creepy","makemesuffer","cursed_images"];
        } else if(chName.includes("farmbuild") || chName.includes("minecraft") || type == "minecraft") {
          sub = ["minecraftmemes"]
        } else if(chName.includes("politics") || type == "politics") {
          sub = ["historymemes"]
        } else if (chName.includes("cool") || type == "cool") {
          sub = ["nextlevel"]
        }
      }
    }
    sub = sub[func.random(0, sub.length)];
    // console.log(sub)
    try {
      const { body } = await snekfetch
        .get(`https://www.reddit.com/r/${sub}.json?sort=top&t=week`)
        .query({ limit: 800 });

      var allowed = msg.channel.nsfw
        ? body.data.children
        : body.data.children.filter(post => !post.data.over_18);

      allowed = allowed.filter(post =>
        post.data.url.includes("https://i.redd.it/")
      );

      if (!allowed.length)
        return await msg.channel.send(
          `It seems I am out of fresh ${sub}!, Try again later.`
        );

      const randomnumber = func.random(0, allowed.length),
        data = allowed[randomnumber].data;

      if (postedMemes.includes(data.url)) return;

      postedMemes.push(data.url);

      await msg.channel.send(
        func.embed(
          /* data.title, `Here is a meme`*/"",
          0x00a2e8,
          `**${data.title}** Memes provided by **r/${sub}** posted by: **${data.author}**`,
          msg.author,
          data.url
        )
      );
    } catch (err) {
      return console.log(err);
    }
  }
};
>>>>>>> glitch
