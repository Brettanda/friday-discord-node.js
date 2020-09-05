require("dotenv").config();
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./bot.js", {
  totalShards: "auto",
  //   respawn: true,
  token: process.env.TOKEN,
  shardArgs: process.argv,
});

manager.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}`));
manager.spawn();
