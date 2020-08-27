const { games } = require("../config.json");

module.exports = bot => {
  game(bot);
};

function game(bot) {
  const num = Math.floor(Math.random() * (+games.length - +0) + +0);
  const gm = games[num];

  bot.user.setActivity(gm, { type: "PLAYING" });
  // console.info("Currently playing: " + gm);

  setInterval(() => {
    // game(bot);
    const num = Math.floor(Math.random() * (+games.length - +0) + +0);
    const gm = games[num];

    bot.user.setActivity(gm, { type: "PLAYING" });
    console.info("Currently playing: " + gm);
  }, 1800000);
}
