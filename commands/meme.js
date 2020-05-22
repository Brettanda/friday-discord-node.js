const snekfetch = require("snekfetch");

const func = require("../functions");

var postedMemes = [];

module.exports = {
  name: "meme",
  description: "Gets a meme from Reddit and sends the an image",
  async execute(msg, args, bot) {
    var sub = ["dankmemes", "memes","wholesomememes","animemes"];
    sub = sub[func.random(0, sub.length)];
    // console.log(sub)
    try {
      const { body } = await snekfetch
        .get(`https://www.reddit.com/r/${sub}.json?sort=top&t=week`)
        .query({ limit: 800 });

      const allowed = msg.channel.nsfw
        ? body.data.children
        : body.data.children.filter(post => !post.data.over_18);

      if (!allowed.length)
        return msg.channel.send(
          `It seems I am out of fresh ${sub}!, Try again later.`
        );

      const randomnumber = func.random(0, allowed.length);

      if (postedMemes.includes(allowed[randomnumber].data.url)) return;

      postedMemes.push(allowed[randomnumber].data.url);

      msg.channel.send(
        func.embed(
          /* allowed[randomnumber].data.title,*/ `Here is a meme`,
          0x00a2e8,
          `Memes provided by r/${sub} posted by: ${allowed[randomnumber].data.author}`,
          msg.author,
          allowed[randomnumber].data.url
        )
      );
    } catch (err) {
      return console.log(err);
    }
  }
};
