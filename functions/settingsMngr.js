const fs = require("fs");

exports.save = async (msg) => {
  const def = { dontMessageServers: ["264445053596991498"], messagesToDelete: {} };

  if (!fs.existsSync("./autoSettings.json"))
    fs.writeFileSync("./autoSettings.json", JSON.stringify(def, null, 4), { flag: "w" });

  const set = require("../autoSettings.json");

  if (Object.keys(set.messagesToDelete).length === 0) {
    set.messagesToDelete = { [msg.guild.id]: { [msg.channel.id]: [] } };
  }

  if (!set.messagesToDelete[msg.guild.id][msg.channel.id])
    set.messagesToDelete[msg.guild.id][msg.channel.id] = [];

  set.messagesToDelete[msg.guild.id][msg.channel.id].push(msg.id);

  const data = JSON.stringify(set, null, 4);

  fs.writeFileSync("./autoSettings.json", data, { encoding: "utf8", flag: "w" });
};
