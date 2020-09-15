module.exports = {
  name: "smile",
  description: "Gets a r/mademesmile meme from Reddit and sends the image",
  async execute(msg, args, bot) {
    const subs = ["mademesmile"];

    require("./meme").execute(msg, args, bot, "", subs);
  },
};
