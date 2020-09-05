const { random, embed } = require("../functions/");
const { delMSGtimeout } = require("../config.json");

// TODO: k should display the highest roll example !r 2d20k1 + 5 should show the highest roll for 2d20 and + 5 to it for advantage rolls, l for disadvantage
// https://en.wikipedia.org/wiki/Dice_notation

module.exports = {
  name: "roll",
  aliases: ["d", "dice", "r"],
  description: "D&D dice rolling, (Advantage and disadvantage will be added soon)",
  usage: "1d20+60/3 or !r 100d2+120d21*6+2",
  execute(msg, args, bot) {
    if (!args.length) {
      msg.reply("Don't forget the dice face count");
      return;
    }

    if (args.join(" ").includes("k") || args.join(" ").includes("l")) return msg.reply("K,L dice notation will be added in the future soon");

    // if (args.length > 1)
    //   return msg.reply(`\`${args.join(" ")}\`This command only works without spaces`);

    let resp = args.join(" ").split("x").join("*");

    const diceRolls = resp.split("").filter((letter, index) => resp.charAt(index).toLowerCase() == "d");

    diceRolls.map(() => {
      const roll = resp.match(/([0-9]+)*d[0-9]+/);

      const rollTimes = typeof roll[1] === "string" ? parseInt(roll[1]) : 1;
      const max = roll[0].match(/(?:d)([0-9]+)/)[1];
      let rolls = "";
      [...Array(rollTimes)].map((item, index) => {
        let newRoll = random(1, max);

        rolls += newRoll;
        if (index + 1 < rollTimes) rolls += "+";
      });
      // rolls += ")";
      resp = resp.replace(roll[0], `(${rolls})`);
    });
    const math = resp;
    resp = eval(resp);

    msg.channel
      .send(
        embed({
          title: `Your Total: ${resp}`,
          color: "#fdfdfd",
          author: msg.author,
          msg: `**Query:** ${args.join(" ")}`,
          val: `\n**Result:** '${math}'`,
        })
      )
      .then((status) => status.delete({ timeout: delMSGtimeout * 20 }));
  },
};
