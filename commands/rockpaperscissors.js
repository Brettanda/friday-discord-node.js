const func = require("../functions");

module.exports = {
  name: "rockpaperscissors",
  aliases: ["rps"],
  description: "Play Rock Paper Scissors with Friday",
  usage: "[rock, paper or scissors]",
  execute(msg, args = "", bot) {
    if (args == "") return msg.channel.send(func.embed({ title: "Don't forget your choice of Rock, Paper, or Scissors!", description: "eg: `!rps rock`", color: "#BAFAE5", author: msg.author }));

    const choices = ["rock", "paper", "scissors"];

    const legalChoice = choices.filter(item => item == args.join(" ").toLowerCase());

    if (legalChoice.length != 1)
      return msg.channel.send(func.embed({ title: `\`${args.join(" ")}\` is not rock, paper, or scissors. Please choose one of those.`, color: "#BAFAE5", author: msg.author }));

    const player = args.join(" ").toLowerCase();
    const choice = choices[func.random(0, choices.length)];

    let winner = "";
    const user = msg.member.nickname != null ? msg.member.nickname : msg.author.username;
    const me = msg.guild.me.nickname != null ? msg.guild.me.nickname : bot.user.username;

    if (player == choice) winner = "Tie";

    if (player == "rock" && choice == "paper") winner = me;

    if (player == "rock" && choice == "scissors") winner = user;

    if (player == "paper" && choice == "scissors") winner = me;

    if (player == "paper" && choice == "rock") winner = user;

    if (player == "scissors" && choice == "rock") winner = me;

    if (player == "scissors" && choice == "paper") winner = user;

    return msg.channel.send(
      func.embed({ title: `Your move: ${args.join(" ").toLowerCase()} VS My move: ${choice}`, color: "#BAFAE5", description: `The winner of this round is: **${winner}**`, author: msg.author }),
    );
  },
};
