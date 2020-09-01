const { random, embed } = require("../functions/");
const { delMSGtimeout } = require("../config.json");

// TODO: this rolls the dice but not the **2**d20 number of time the dice should be rolled

module.exports = {
  name: "roll",
  aliases: ["d", "dice", "r"],
  description: "D&D dice rolling",
  usage: "1d20+60/3 or !r 100d2+120d21*6+2",
  execute(msg, args, bot) {
    if (!args.length) {
      msg.reply("Don't forget the dice face count");
      return;
    }

    if (args.length > 1)
      return msg.reply(`\`${msg.args.join(" ")}\`This command only works without spaces`);

    const diceRolls = args
      .join(" ")
      .split("")
      .filter((letter, index) => args.join(" ").charAt(index).toLowerCase() == "d");
    let resp = args.join(" ");

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
        embed(
          `Your Total: ${resp}`,
          "#fdfdfd",
          "",
          msg.author,
          "",
          "",
          "",
          `**Query:** ${args.join(" ")}`,
          `\n**Result:** '${math}'`
        )
      )
      .then((status) => status.delete({ timeout: delMSGtimeout * 20 }));
  },
};
