const fetch = require("node-fetch");
// const MessageAttachment = require("discord.js");

const func = require("../functions");

const postedMemes = [];

module.exports = {
  name: "meme",
  description: "Gets a meme from Reddit and sends the an image",
  async execute(msg, type, bot, command, prefix, subs = ["dankmemes", "memes"]) {
    if (msg.channel.type != "dm") {
      const chName = msg.channel.name;
      if (!chName.includes("no") && !chName.includes("dont")) {
        if (chName.includes("anime") || chName.includes("weeb") || type == "anime") subs = ["animemes"];
        else if ((msg.channel.nsfw && chName.includes("hentai")) || type == "hentai") subs = ["hentaimemes"];
        else if (msg.channel.nsfw && (chName.includes("disturbing") || chName.includes("wtf") || type == "wtf")) subs = ["wtf", "creepy", "makemesuffer", "cursed_images"];
        else if (chName.includes("farmbuild") || chName.includes("minecraft") || type == "minecraft") subs = ["minecraftmemes"];
        else if (chName.includes("politics") || type == "politics") subs = ["historymemes"];
        else if (chName.includes("cool") || type == "cool") subs = ["nextlevel"];
      }
    }
    console.log(subs);
    return require("../functions/reddit")(msg, bot, subs, "images");
    // const sub = subs[func.random(0, subs.length)];
    // msg.channel.startTyping();
    // // await fetch(`https://www.reddit.com/r/${sub}.json?sort=top&t=week`, { method: "GET" })
    // //   .then(res => res.json())
    // // .then(json => console.log(json));
    // // try {
    // const body = await func.promiseTimeout(fetch(`https://www.reddit.com/r/${sub}.json?sort=top&t=week`, { method: "GET" }).then(res => res.json())).catch(err => {
    //   console.error(err);
    //   msg.channel.stopTyping(true);
    //   msg.channel.send(func.embed({ title: "Connection timed out", author: msg.author }));
    //   return func.msgDev(err, bot, "log-errors");
    // });
    // // const { body } = await fetch(`https://www.reddit.com/r/${sub}.json?sort=top&t=week`, { method: "GET", body: { limit: 800 } });

    // let allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);

    // allowed = allowed.filter(post => post.data.url.includes("https://i.redd.it/"));

    // if (!allowed.length) return await msg.channel.send(`It seems I am out of fresh ${sub}!, Try again later.`);

    // const randomnumber = func.random(0, allowed.length),
    //   data = allowed[randomnumber].data;

    // if (postedMemes.includes(data.url)) return;

    // postedMemes.push(data.url);

    // await msg.channel.stopTyping(true);
    // await msg.channel.send(
    //   func.embed({
    //     // data.title, `Here is a meme` "",
    //     color: 0x00a2e8,
    //     description: `**${data.title}** Memes provided by **r/${sub}** posted by: **${data.author}**`,
    //     author: msg.author,
    //     image: data.url,
    //   }),
    // );
    // } catch (err) {
    //   console.log(err);
    //   return func.msgDev(err, bot, "log-errors");
    // }
  },
};
