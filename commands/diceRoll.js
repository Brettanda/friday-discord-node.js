const func = require("../functions/");
const { delMSGtimeout } = require("../config.json");

// TODO: this rolls the dice but not the **2**d20 number of time the dice should be rolled

module.exports = {
  name: "d",
  aliases: ["dice"],
  hidden: true,
  owner: true,
  description: "D&D dice rolling",
  usage: "[Dice face count]+[Dice modifier]",
  execute(msg,args,bot) {
    if(!args.length) {msg.reply("Don't forget the dice face count");return};

    if(args.length > 1) return msg.reply(`\`${msg.args.join(" ")}\`This command only works without spaces`)

    const diceRolls = args.join(" ").split("").filter((letter,index) => args.join(" ").charAt(index).toLowerCase() == "d");
    let resp = args.join(" ");

    diceRolls.map(() => {
      const roll = resp.match(/([0-9]+)*d[0-9]+/);

      // console.log(roll);
      const max = roll[0].match(/(?:d)([0-9]+)/)[1];
      // console.log(max);
      const newRoll = func.random(1,max);

      resp = resp.replace(roll[0],`(${newRoll})`);
      
    })
    const math = resp;
    resp = eval(resp);

    msg.channel.send(func.embed(`You Rolled: **${resp}**`,"#fff","",msg.author,"","","",args.join(" "),`\nOriginal: '${math}'\n\n=**${resp}**`)).then(status => status.delete({timeout: delMSGtimeout * 20}));

    // !20d20+3*6/3
    // (([0-9]+)*d[0-9]+)
    // (?:(\d+)*d(\d+))+([0-9\+\/\*\-]+)
  }
}