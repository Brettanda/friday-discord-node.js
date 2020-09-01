module.exports = {
  name: "vote",
  aliases: ["poll"],
  hidden: true,
  description: "Vote for your favorite thing. eg `vote 'is water wet?' 20 yes no maybe`",
  usage:
    "[Title/Thing to vote on] [Time in minutes] [Vote Reaction] [Vote Reaction] ...[Vote Reaction]",
  async execute(msg, args, bot) {},
};
